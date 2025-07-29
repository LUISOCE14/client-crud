<template>
    <div class="loading-overlay" v-if="show">
      <div class="spinner-container">
        <div class="modern-spinner" :class="spinnerClass">
          <div class="spinner-circle"></div>
        </div>
        <div class="loading-text" v-if="showText">
          <div class="loading-title">{{ title }}</div>
          <div class="loading-message">{{ message }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Procesando...'
    },
    message: {
      type: String,
      default: 'Por favor espere'
    },
    type: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'success', 'error', 'warning'].includes(value)
    },
    showText: {
      type: Boolean,
      default: true
    }
  })
  
  const spinnerClass = computed(() => `spinner-${props.type}`)
  </script>
  
  <style scoped>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    animation: fadeIn 0.3s ease-out;
  }
  
  .spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  
  .modern-spinner {
    position: relative;
    width: 60px;
    height: 60px;
  }
  
  .spinner-circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .spinner-primary .spinner-circle {
    border-top-color: #1976d2;
    border-right-color: rgba(25, 118, 210, 0.3);
  }
  
  .spinner-success .spinner-circle {
    border-top-color: #4caf50;
    border-right-color: rgba(76, 175, 80, 0.3);
  }
  
  .spinner-error .spinner-circle {
    border-top-color: #f44336;
    border-right-color: rgba(244, 67, 54, 0.3);
  }
  
  .spinner-warning .spinner-circle {
    border-top-color: #ff9800;
    border-right-color: rgba(255, 152, 0, 0.3);
  }
  
  .loading-text {
    text-align: center;
    max-width: 300px;
  }
  
  .loading-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .loading-message {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.4;
  }
  
  @keyframes spin {
    0% { 
      transform: rotate(0deg); 
    }
    100% { 
      transform: rotate(360deg); 
    }
  }
  
  @keyframes fadeIn {
    from { 
      opacity: 0; 
    }
    to { 
      opacity: 1; 
    }
  }
  
  /* Responsive */
  @media (max-width: 600px) {
    .loading-overlay {
      background: rgba(255, 255, 255, 0.9);
    }
    
    .loading-title {
      font-size: 1rem;
    }
    
    .loading-message {
      font-size: 0.85rem;
    }
    
    .modern-spinner {
      width: 50px;
      height: 50px;
    }
  }
  </style>
  