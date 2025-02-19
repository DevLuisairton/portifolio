document.addEventListener('DOMContentLoaded', () => {
  // Seleção de elementos
  const burguerMenu = document.querySelector('.burguer');
  const mobileLinks = document.querySelector('.mobile__links');
  const navbar = document.querySelector('.navbar');
  const navbarMobile = document.querySelector('.navbar__mobile');
  const allLinks = document.querySelectorAll('.navbar__links a, .mobile__links a');

  // Toggle menu mobile com nova animação
  const toggleMobileMenu = () => {
      navbarMobile.classList.toggle('active');
      
      // Adiciona delay nas animações dos links
      if (navbarMobile.classList.contains('active')) {
          document.body.style.overflow = 'hidden';
          document.querySelectorAll('.mobile__links li').forEach((link, index) => {
              link.style.animationDelay = `${0.3 + (index * 0.1)}s`;
          });
      } else {
          document.body.style.overflow = '';
          // Reset dos delays de animação
          document.querySelectorAll('.mobile__links li').forEach(link => {
              link.style.animationDelay = '0s';
          });
      }
  };

  // Fechar menu com animação
  const closeMenu = () => {
      navbarMobile.classList.remove('active');
      document.body.style.overflow = '';
      
      // Reseta animações
      document.querySelectorAll('.mobile__links li').forEach(link => {
          link.style.animationDelay = '0s';
      });
  };

  // Smooth scroll com offset ajustado
  const smoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
          const offsetTop = targetElement.offsetTop - navbar.offsetHeight;
          window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
          });
          closeMenu();
      }
  };

  // Handler do scroll com threshold
  const handleScroll = () => {
      if (window.scrollY > 50) {
          navbar.classList.add('active');
      } else {
          navbar.classList.remove('active');
      }
  };

  // Click outside com zona de segurança
  const handleClickOutside = (e) => {
      if (navbarMobile.classList.contains('active') && 
          !navbarMobile.contains(e.target) && 
          !burguerMenu.contains(e.target)) {
          closeMenu();
      }
  };

  // Event Listeners com passive true onde possível
  burguerMenu.addEventListener('click', toggleMobileMenu);
  allLinks.forEach(link => link.addEventListener('click', smoothScroll));
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', closeMenu, { passive: true });
  document.addEventListener('click', handleClickOutside);

  // Prevenir scroll no mobile quando menu está aberto
  window.addEventListener('touchmove', (e) => {
      if (navbarMobile.classList.contains('active')) {
          e.preventDefault();
      }
  }, { passive: false });
});