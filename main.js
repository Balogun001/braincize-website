

async function upload(event) {

    const imgs = await event.target.files;

    let input_image = document.getElementById("input_image")

    input_image.src = URL.createObjectURL(imgs[0]);
    	
}

async function predict() {

    const loader = document.getElementById('spinner')

    const resElem = document.getElementById('predictionResult');

    resElem.classList.add('d-none');

    loader.classList.remove('d-none')

    console.log('Loading model..');

    const model = await tf.loadLayersModel('model.json');

    console.log('Successfully loaded model');

    let input_image = document.getElementById("input_image")

    const tensor = await tf.browser.fromPixels(input_image);

    const prediction = await model.predict(tensor.expandDims(0));

    console.log('predicting object');

    const result = await prediction.dataSync();

    const labels = ['no shrinkage', 'shrinkage'];

    

    const greatest = result[0] > result[1] ? 0 : 1;

    resElem.innerHTML = `there is ${labels[greatest]} with a ${result[greatest].toFixed(2) * 100}% propability`

    resElem.classList.remove('d-none');

    loader.classList.add('d-none')

}