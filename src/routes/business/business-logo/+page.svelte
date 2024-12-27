<script>
    import { uploadBusinessLogo } from '$lib/stores/business'; // Adjust the path if necessary

    let fileName = '';
    // @ts-ignore
    let selectedFile = null; // To keep track of the selected file
    const businessProfileId = 123; // Replace with the actual business profile ID

    function handleFileClick() {
        // @ts-ignore
        document.getElementById('fileInput').click();
    }

    // @ts-ignore
    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            fileName = `File "${file.name}" selected.`;
            selectedFile = file;
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
            selectedFile = file;
            alert(fileName);
        }
    }

    async function handleUpload() {
        // @ts-ignore
        if (!selectedFile) {
            alert('Please select a file before continuing.');
            return;
        }

        const success = await uploadBusinessLogo(selectedFile, businessProfileId);

        if (success) {
            alert('Logo uploaded successfully! Redirecting...');
            window.location.href = '/business/business-home';
        } else {
            alert('Logo upload failed. Please try again.');
        }
    }
</script>

<div class="container">
    <div class="card">
        <div class="slider-container">
            <progress class="progress is-info" value="40" max="100"></progress>
        </div>
    </div>

    <div class="card">
        <div class="has-text-centered mb-5">
            <h2 class="title is-4">Upload your Logo</h2>
            <p class="subtitle is-6">
                Upload your logo to represent your brand visually
            </p>
        </div>

        <div class="columns is-centered is-variable is-8">
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
                    <input type="file" id="fileInput" on:change={handleFileChange} style="display: none;" />
                </div>
            </div>
        </div>
        <p class="subtitle is-6" style="color: gray;">
            Formats accepted are .jpg, .png, and .svg
        </p>

        <div class="has-text-centered">
            <button
                id="continue-button"
                class="button is-primary"
                style="border-radius: 10px; margin-bottom: 30px; color: white; background-color: #118BF6; width: 214px;"
                on:click={handleUpload}
            >
                Continue
            </button>
        </div>
    </div>
</div>


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