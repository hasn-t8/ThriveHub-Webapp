<script>
    let fileName = '';

    function handleFileClick() {
        // @ts-ignore
        document.getElementById('fileInput').click();
    }

    // @ts-ignore
    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            fileName = `File "${file.name}" selected.`;
            alert(fileName);
        }
    }

    // @ts-ignore
    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragLeave() {
        // @ts-ignore
        document.getElementById('fileUploadCard').style.borderColor = '#ddd';
    }

    // @ts-ignore
    function handleDrop(event) {
        event.preventDefault();
        // @ts-ignore
        document.getElementById('fileUploadCard').style.borderColor = '#ddd';
        const file = event.dataTransfer.files[0];
        if (file) {
            fileName = `File "${file.name}" uploaded.`;
            alert(fileName);
        }
    }
</script>

<style>
    /* Global Styles */
    body {
        font-family: 'Inter', sans-serif;
        background-color: #E7F3FE;
        height: auto;
    }

    .slider-container {
        width: 60%;
        margin: 0 auto;
    }

    .progress {
        height: 5px;
    }

    .title.is-4 {
        margin-bottom: 47px;
    }

    .card {
        background: white;
        border-radius: 8px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        padding: 20px;
        margin-top: 15px;
        width: 60%;
    }

    .container {
        justify-items: center;
    }

    .category-card {
        border: 2px dashed #ddd;
        border-radius: 10px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        height: 110px;
        justify-content: center;
        transition: border-color 0.3s;
    }

    .category-card:hover {
        border-color: #118BF6;
    }

    .category-card input[type="file"] {
        display: none;
    }

    .category-card .icon {
        font-size: 24px;
        margin-bottom: 10px;
        color: #888;
    }

    .category-card span {
        display: block;
        color: #555;
        font-size: 14px;
    }

    .button-container {
        background-color: #118BF6;
        color: white;
        border-radius: 8px;
        font-weight: 500;
        border: none;
        padding: 10px 20px;
    }

    .button-container .button {
        width: 50%;
        background-color: #118BF6;
        color: white;
    }
</style>

<div class="container">
    <!-- Slider -->
    <div class="card">
        <div class="slider-container">
            <progress class="progress is-info" value="40" max="100"></progress>
        </div>
    </div>

    <div class="card">
        <!-- Title -->
        <div class="has-text-centered mb-5">
            <h2 class="title is-4">Upload your Logo</h2>
            <p class="subtitle is-6">
                Upload your logo to represent your brand visually
            </p>
        </div>

        <div class="columns is-centered is-variable is-8">
            <!-- Category Card -->
            <div class="column is-full">
                <div
                    id="fileUploadCard"
                    class="category-card"
                    on:click={handleFileClick}
                    on:dragover={handleDragOver}
                    on:dragleave={handleDragLeave}
                    on:drop={handleDrop}
                >
                    <div class="icon" style="padding-right: 2%;">
                        <i class="fas fa-cloud-upload-alt"></i>
                    </div>
                    <span>Click or drag file to this area to upload</span>
                    <input type="file" id="fileInput" on:change={handleFileChange} />
                </div>
            </div>
        </div>
        <p class="subtitle is-6" style="color: gray;">
            Formats accepted are .jpg, .png and .svg
        </p>

        <!-- Continue Button -->
        <div class="has-text-centered">
            <a href="/business/business-about">
            <button
                id="continue-button"
                class="button is-primary"
                style="border-radius: 10px; margin-bottom: 30px; color: white; background-color: #118BF6; width: 214px;"
            >
                Continue
            </button>
        </a>
        </div>
    </div>
</div>
