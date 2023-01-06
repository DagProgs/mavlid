<script>
    if ("serviceWorker" in navigator) {
        self.addEventListener("load", async () => {
            const container = navigator.serviceWorker;
            if (container.controller === null) {
                const reg = await container.register("mysw.js");
            }
        });
    }
</script>