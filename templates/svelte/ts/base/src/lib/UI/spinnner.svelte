<div id="qv-spinner" class="spinner-overlay">
    <div class="spinner-container" />
</div>

<style>
    @keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    .spinner-overlay {
        z-index: 1000;
        display: flex;
        justify-content: center;
        width: 100%;
        height: calc(100% - 135px);
        position: absolute;
        background: #fff;
    }

    .spinner-container {
        display: inline-block;
        display: flex;
        align-self: center;
        width: 50px;
        height: 50px;
        border: 3px solid rgba(146, 146, 146, 0.6);
        border-radius: 50%;
        border-top-color: #d7d8d6;
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
    }
</style>
