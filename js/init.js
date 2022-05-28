function init() {
    console.log('cargo');
    const newLocal = "js/colores.json";
    fetch(newLocal)
        .then(response => response.json())
        .then(response => {
            Array.from(response).forEach(item => {
                console.log('jok');
            })
        });

}
init();
/*try {
    object = JSON.parse(json);
} catch (error) {
    is_json = false;
    console.log("Invalid JSON string");
}*/