let globalZIndex = 1;

export default {
    mounted(el) {
        const header = el.querySelector(".custom-inner-header");
        const container = el.parentElement;

        if (!header || !container) return;

        el.style.position = "absolute";
        el.style.zIndex = globalZIndex;
        el.style.backgroundColor = "#fff";
        el.style.border = "1px solid #ccc";
        el.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.2)";

        let offsetX = 0, offsetY = 0;

        const onMouseDown = (e) => {
            if (e.button !== 0) return;

            const rect = el.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            globalZIndex++;
            el.style.zIndex = globalZIndex;

            const onMouseMove = (e) => {
                let left = e.clientX - containerRect.left - offsetX;
                let top = e.clientY - containerRect.top - offsetY;

                left = Math.max(0, Math.min(left, container.offsetWidth - el.offsetWidth));
                top = Math.max(0, Math.min(top, container.offsetHeight - el.offsetHeight));

                el.style.left = `${left}px`;
                el.style.top = `${top}px`;
            };

            const onMouseUp = () => {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            };

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        };

        header.style.cursor = "move";
        header.addEventListener("mousedown", onMouseDown);
    }
};
