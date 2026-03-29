const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});
const app = express();

// Middlewares
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse JSON bodies
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// --- API Routes ---

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'success', message: 'API do SoloSync rodando perfeitamente!' });
});

// GET /api/proposals - Fetch all proposals from SQLite DB
app.get('/api/proposals', async (req, res) => {
  try {
    const proposals = await prisma.proposal.findMany({
      orderBy: { id: 'desc' }
    });
    res.json(proposals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch proposals' });
  }
});

// POST /api/proposals - Create a new proposal in DB
app.post('/api/proposals', async (req, res) => {
  const { title, client, value } = req.body;
  
  if (!title || !client || !value) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newProposal = await prisma.proposal.create({
      data: {
        title,
        client,
        value: parseFloat(value),
        time: 'Agora mesmo',
        status: 'Rascunho',
        statusClass: 'status-draft'
      }
    });

    res.status(201).json(newProposal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create proposal' });
  }
});

// GET /api/clients
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await prisma.client.findMany({ orderBy: { name: 'asc' } });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

// POST /api/clients
app.post('/api/clients', async (req, res) => {
  const { name, email, company } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Missing fields' });
  
  try {
    const newClient = await prisma.client.create({
      data: { name, email, company }
    });
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create client' });
  }
});

// GET /api/contracts
app.get('/api/contracts', async (req, res) => {
  try {
    const contracts = await prisma.contract.findMany({ orderBy: { id: 'desc' } });
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contracts' });
  }
});

// GET /api/invoices
app.get('/api/invoices', async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({ orderBy: { id: 'desc' } });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// POST /api/invoices - Create new invoice
app.post('/api/invoices', async (req, res) => {
  const { client, value } = req.body;
  if (!client || !value) return res.status(400).json({ error: 'Missing client or value' });
  
  try {
    const newInvoice = await prisma.invoice.create({
      data: {
        client,
        value: parseFloat(value),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
        status: 'Pendente'
      }
    });
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

// GET /api/appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// POST /api/appointments/toggle - Simula reserva/cancelamento de slot
app.post('/api/appointments/toggle', async (req, res) => {
  const { id } = req.body;
  try {
    const slot = await prisma.appointment.findUnique({ where: { id } });
    const updated = await prisma.appointment.update({
      where: { id },
      data: { booked: !slot.booked }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

// GET /api/stats - Dashboard metrics
app.get('/api/stats', async (req, res) => {
  try {
    const clientsCount = await prisma.client.count();
    const proposalsCount = await prisma.proposal.count();
    const contractsCount = await prisma.contract.count();
    const invoices = await prisma.invoice.findMany();
    const totalMRR = invoices.reduce((acc, inv) => acc + inv.value, 0);

    res.json({
      mrr: totalMRR,
      clients: clientsCount,
      activeProjects: contractsCount,
      pendingProposals: proposalsCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// --- Server Startup ---
const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  // Seeds
  if (await prisma.proposal.count() === 0) {
    await prisma.proposal.createMany({
      data: [
         { title: 'Design App Financeiro', client: 'TechCorp', value: 4500, status: 'Enviado', statusClass: 'status-pending' },
         { title: 'Consultoria UX 20h', client: 'Startup Alpha', value: 1200, status: 'Aceito', statusClass: 'status-paid' }
      ]
    });
  }
  if (await prisma.client.count() === 0) {
    await prisma.client.createMany({
      data: [
        { name: 'Ricardo Martins', email: 'ricardo@techcorp.com', company: 'TechCorp Finance' },
        { name: 'Ana Silva', email: 'ana@startupalpha.com', company: 'Startup Alpha' }
      ]
    });
  }
  if (await prisma.contract.count() === 0) {
    await prisma.contract.createMany({
      data: [
        { client: 'TechCorp Finance', project: 'Design App Fin+', value: 4500, signedAt: '24 Mar 2026', status: 'Ativo' },
        { client: 'Startup Alpha', project: 'Consultoria UX 20h', value: 1200, signedAt: '20 Mar 2026', status: 'Finalizado' }
      ]
    });
  }
  if (await prisma.invoice.count() === 0) {
    await prisma.invoice.createMany({
      data: [
        { client: 'TechCorp Finance', value: 2250, dueDate: '30 Mar 2026', status: 'Pago' },
        { client: 'Startup Alpha', value: 1200, dueDate: '15 Abr 2026', status: 'Pendente' }
      ]
    });
  }
  if (await prisma.appointment.count() === 0) {
    const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const times = ['09:00', '10:00', '11:00', '14:00', '15:30'];
    const seeds = [];
    days.forEach(day => {
      times.forEach(time => {
        seeds.push({ day, time, booked: Math.random() > 0.8 });
      });
    });
    await prisma.appointment.createMany({ data: seeds });
  }
  console.log('🌱 Banco de dados SoloSync pronto e populado!');
  console.log(`✅ Servidor backend rodando na porta ${PORT}`);
});
