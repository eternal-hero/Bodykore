module.exports = {
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: {
        standard: ['outline-none'],
      },
    },
  },
  variants: {
    fill: ['hover', 'focus'],
  },
  theme: {
    extend: {
      maxWidth: {
        '9xl': '1920px',
        '8xl': '1540px'
      },
      colors: {
        primary: 'var(--primary)',
        'primary-2': 'var(--primary-2)',
        secondary: 'var(--secondary)',
        'secondary-2': 'var(--secondary-2)',
        hover: 'var(--hover)',
        'hover-1': 'var(--hover-1)',
        'hover-2': 'var(--hover-2)',
        'accent-0': 'var(--accent-0)',
        'accent-1': 'var(--accent-1)',
        'accent-2': 'var(--accent-2)',
        'accent-3': 'var(--accent-3)',
        'accent-4': 'var(--accent-4)',
        'accent-5': 'var(--accent-5)',
        'accent-6': 'var(--accent-6)',
        'accent-7': 'var(--accent-7)',
        'accent-8': 'var(--accent-8)',
        'accent-9': 'var(--accent-9)',
        violet: 'var(--violet)',
        'violet-light': 'var(--violet-light)',
        'violet-dark': 'var(--violet-dark)',
        pink: 'var(--pink)',
        'pink-light': 'var(--pink-light)',
        cyan: 'var(--cyan)',
        blue: 'var(--blue)',
        green: 'var(--green)',
        red: 'var(--red)',
        'white-f2f9fa': '#F2F9FA',
        'red-bc2026': '#BC2026',
        'black-373933': '#373933',
        'black-1c2023': '#1C2023',
        'gray-char': '#CECECE',
        'grey-848484' : '#848484',
        'grey-8C8C8C' : '#8C8C8C',
      },
      textColor: {
        base: 'var(--text-base)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      boxShadow: {
        'outline-normal': '0 0 0 2px var(--accent-2)',
        magical:
          'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
      },
      lineHeight: {
        'extra-loose': '2.2',
      },
      scale: {
        120: '1.2',
      },
      backgroundImage: {
        'loyalty-image': "url('/LoyaltyProgram/coverImageLoy.jpg')",
        'referFriend-image': "url('/LoyaltyProgram/referFriend.jpg')",
        'portfolio-image': "url('/Portfolio/coverImage.jpg')",
        'portfolio-project-image': "url('/PortfolioProject/coverImage.jpg')",
        'manuals-image': "url('/Manuals/coverImage.jpg')",
        'abductor-manuals-image': "url('/Manuals/abductor.jpg')",
        'latPulldown-manuals-image': "url('/Manuals/latPulldown.jpg')",
        'legPress-manuals-image': "url('/Manuals/legPress.jpg')",
        'blog-image': "url('/Blog/coverImage.jpg')",
        'blog-article1-image': "url('/Blog/1.jpg')",
        'blog-article2-image': "url('/Blog/2.jpg')",
        'blog-article3-image': "url('/Blog/3.jpg')",
        'blogArticle-image': "url('/BlogArticle/banner.jpg')",
        'blogArticle-art1-image': "url('/BlogArticle/article1.jpg')",
        'blogArticle-art2-image': "url('/BlogArticle/article2.jpg')",
        'blogArticle-art3-image': "url('/BlogArticle/article3.jpg')",
        'cat-packages-image': "url('/CatPackages/coverImage.jpg')",
        'catPack-videoSec-image': "url('/CatPackages/videoSection.jpg')",
        'allProducts-image': "url('/AllProducts/bannerImg.jpg')",
        'allPackages-universal': "url('/AllPackages/universal.png')",
        'allPackages-freeWeight': "url('/AllPackages/freeWeight.png')",
        'allPackages-weightRoom': "url('/AllPackages/weightRoom.png')",
        'allPackages-garage': "url('/AllPackages/garage.png')",
        'allPackages-home': "url('/AllPackages/home.png')",
        'allPackages-dynamic': "url('/AllPackages/dynamic.png')",
        'benches-image': "url('/Category/cover-image-benches.png')",
        'mid-banner': "url('/Category/midBanner-img.png')",
        'contact-image': "url('/Contact/main-banner.png')",
      },
      fontFamily: {
        bebas: ['Bebas Neue'],
        roboto: ['"Roboto"', 'sans-serif'],
        'acumin-pro': ['"acumin-pro"', 'sans-serif'],
      },
      keyframes: {
        zoomBlack: {
          '0%': { 
            background: 'rgba(0,0,0,0.5)' 
          },
          '100%': { 
            background: 'rgba(0,0,0,0)' 
          },
        }
      }
    },
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    fontSize: {
      'xxs': '.375rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      'main-banner-title': '6rem',
    }
  },
}
