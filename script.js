tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#ff4300', brandWhite: '#ffffff', brandBlack: '#1a1a1a',
                        textBase: '#1f2937', textMuted: '#6b7280',
                        componentBgLight: '#ffffff', componentBgDark: '#2d3748',
                        orange: { 100: '#fff8f5', 200: '#ffedd5', 300: '#fed7aa', 400: '#fb923c', 500: '#f97316', 600: '#ea580c' },
                        blue: { 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb' },
                        purple: { 400: '#c084fc', 500: '#a855f7', 600: '#9333ea' }
                    },
                    fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'] },
                    boxShadow: {
                        'primary-glow': '0 0 15px rgba(255, 67, 0, 0.6)',
                        'carousel-lift': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
                        'carousel-lift-dark': '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
                    }
                }
            }
        }