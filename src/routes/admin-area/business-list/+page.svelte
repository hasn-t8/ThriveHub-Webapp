<script>
	import Sidemenu from "../components/Sidemenu.svelte";
    let businesses = [
      {
        id: 1,
        logo: 'https://via.placeholder.com/50',
        name: 'Tech Solutions Inc.',
        category: 'Technology',
        address: '123 Tech Lane, Silicon Valley, CA',
      },

      {
        id: 2,
        logo: 'https://via.placeholder.com/50',
        name: 'BlueHost Pvt. Ltd.',
        category: 'Hosting Services',
        address: '456 Hosting St, Cloud City, NY',
      },
      {
        id: 3,
        logo: 'https://via.placeholder.com/50',
        name: 'Green Energy Co.',
        category: 'Renewable Energy',
        address: '789 Eco Rd, Sustainable City, TX',
      },
      {
        id: 4,
        logo: 'https://via.placeholder.com/50',
        name: 'Thrive Hub.',
        category: 'Software',
        address: '321 cdo Rd,Cloud City, USA',
      },
    ];
  
    function addBusiness() {
  window.location.href = '/admin-area/add-company';
}
  </script> 
  <div class="main-content">
	<Sidemenu />
	<!-- Analytics Header -->
	<div class="analytics-header">
		<div class="header-top">
			<h1>Hi, Alex</h1>
		</div>
		<!-- Divider -->
		<hr class="divider" />
	</div>
  <div class="business-list-container">
    <div class="header">
      <h1>Your Businesses</h1>
      <button class="custom-button add-button" on:click={addBusiness}>Add Business</button>
    </div>
  
    <ul class="business-list">
      {#each businesses as business (business.id)}
        <li class="business-item">
          <div class="business-logo">
            <img src={business.logo} alt="Company Logo" />
          </div>
          <div class="business-info">
            <div class="business-name">{business.name}</div>
            <div class="business-category">{business.category}</div>
            <div class="business-address">{business.address}</div>
          </div>
       
        </li>
      {/each}
    </ul>
  </div>
</div>
  <style>
    .main-content {
		margin-left: 200px;
	}
	.analytics-header {
		margin-left: 50px;
		padding: 20px;
		background-color: transparent;
	}
	.header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.analytics-header h1 {
		font-size: 2rem;
		font-weight: bold;
		color: #333;
		margin: 0;
	}
	.divider {
		border: none;
		height: 1px;
		background-color: #dfe6ed;
		margin: 20px 0;
	}
    .business-list-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
  
    .header .add-button {
      cursor: pointer;
    }
    .header .add-button:hover {
    background-color: #0056b3; /* Darker blue on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adds a shadow effect */
  }
  .header .add-button:active {
    background-color: #004080; /* Even darker blue on click */
  }
  
    .business-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
  
    .business-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 15px;
      margin-bottom: 10px;
    }
  
    .business-item img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      margin-right: 15px;
    }
  
    .business-info {
      flex-grow: 1;
    }
  
    .business-name {
      font-weight: bold;
      font-size: 18px;
    }
  
    .business-category {
      color: gray;
      font-size: 14px;
    }
  
    .business-actions button {
      margin-left: 10px;
      padding: 8px 12px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    }
  
    .business-actions .edit {
      background-color: #ffc107;
      color: #fff;
    }
  
    .business-actions .deletebutton {
      background-color: #dc3545;
      color: #fff;
    }
  </style>