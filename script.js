document.addEventListener('DOMContentLoaded', () => {
  // Staggered animation for metric cards
  const cards = document.querySelectorAll('.metric-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease ' + (index * 0.1) + 's';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100);
  });

  // Staggered animation for list items
  const listItems = document.querySelectorAll('.list-item');
  listItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.4s ease ' + (index * 0.1 + 0.3) + 's';
    
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 100);
  });
  
  // Interactive Hover Effects on Buttons
  const buttons = document.querySelectorAll('.btn-primary');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.5)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.boxShadow = 'none';
    });
  });
});
