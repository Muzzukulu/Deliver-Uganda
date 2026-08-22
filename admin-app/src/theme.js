// theme.js - Deliver Uganda Design System - UNIFORMITY IS VICTORY
export const THEME = {
  colors: {
    primary: '#2e1a8a',      // Deep purple
    primaryLight: '#6c4eff', // Gradient
    accent: '#FF8A29',       // Deliver Orange
    border: '#e8e4ff',       // Light purple border
    borderFocus: '#6c4eff',
    bgInput: '#f8f7ff',      // Light purple bg
    bgPage: '#f9f8ff',
    textDark: '#17194a',
    textMuted: '#8a8fa8',
    cardShadow: '0 20px 60px rgba(46, 26, 138, 0.08)',
    inputShadowFocus: '0 0 0 4px rgba(108, 78, 255, 0.12)'
  },
  radius: {
    card: '24px',
    input: '12px',
    button: '12px'
  }
}

export const styles = {
  pageWrap: {
    display:'flex', justifyContent:'center', padding:'24px',
    background: THEME.colors.bgPage, minHeight:'100vh'
  },
  card: {
    width:'100%', maxWidth:'480px', background:'white',
    borderRadius: THEME.radius.card, padding:'36px',
    boxShadow: THEME.colors.cardShadow,
    border: `1px solid ${THEME.colors.border}`
  },
  input: {
    height:'52px', padding:'0 16px',
    borderRadius: THEME.radius.input,
    background: THEME.colors.bgInput,
    border: `1px solid ${THEME.colors.border}`,
    outline:'none', fontSize:'14px',
    width:'100%', boxSizing:'border-box',
    transition:'all 0.2s'
  },
  inputFocus: {
    border: `1px solid ${THEME.colors.borderFocus}`,
    boxShadow: THEME.colors.inputShadowFocus,
    background: 'white'
  },
  buttonPrimary: {
    height:'52px', borderRadius: THEME.radius.button,
    border:'none',
    background:`linear-gradient(90deg, ${THEME.colors.primary} 0%, ${THEME.colors.primaryLight} 100%)`,
    color:'white', fontWeight:700, fontSize:'15px', cursor:'pointer'
  },
  label: { fontSize:'13px', fontWeight:600, color: THEME.colors.textDark, marginBottom:'6px', display:'block' },
  title: { fontSize:'26px', fontWeight:800, color: THEME.colors.textDark, margin:0 },
  subtitle: { color: THEME.colors.textMuted, fontSize:'14px', margin:'8px 0 24px' }
}