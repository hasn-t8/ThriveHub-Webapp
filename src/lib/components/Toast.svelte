<script>
	export let message = '';
	export let duration = 3000; // Default duration in milliseconds

	let visible = true;

	// Timer to hide the toast after the specified duration
	const hideToast = () => {
		setTimeout(() => {
			visible = false;
		}, duration);
	};

	// Run the hideToast function when the component is initialized
	hideToast();
</script>

{#if visible}
  <div class="toast" style="--duration: {duration / 1000}">
		{message}
		<button class="close-btn" on:click={() => (visible = false)}>×</button>
	</div>
{/if}

<style>
    .toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 1rem;
      z-index: 100;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      gap: 10px;
      animation: fadein 0.3s, fadeout 0.3s var(--duration)s;
    }
  
    .close-btn {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.2rem;
      cursor: pointer;
      line-height: 1;
    }
  
    .close-btn:hover {
      color: #ff4d4d;
    }
  
    @keyframes fadein {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  
    @keyframes fadeout {
      from {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      to {
        opacity: 0;
        transform: translateX(-50%) translateY(10px);
      }
    }
</style>
