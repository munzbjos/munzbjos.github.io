var container, stats, clock, controls;
var camera, scene, renderer;
init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(25, 70, 50);
    scene = new THREE.Scene();
    scene.add(camera);

    clock = new THREE.Clock();

    // collada loader
    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load("./pavilon.dae", function (collada) {
        var avatar = collada.scene;
        scene.add(avatar);
    });

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    camera.add(directionalLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    var delta = clock.getDelta();
    renderer.render(scene, camera);
}
