let fps = 120; //frames per second
let lastUpdate = document.timeline.currentTime; //last time since frame update
const rooms = [
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'sh', 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 'z', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'z', 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 's', 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 's', 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'sh', 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
     [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
        [1, 0, 0, 1, 1, 0, 'sh', 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 'lt', 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, "lt", 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 'sh', 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 'lt', 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 'z', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'lt', 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'z', 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 'z', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'lt', 0, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 'z', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 'z', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'z', 0, 0, 'z', 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 'z', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 'z', 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'z', 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 'rt', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'lt', 1], 
        [1, 0, 0, 's', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 's', 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 's', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 'rt', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'lt', 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 's', 0, 0, 0, 0, 0, 0, 0, 0, 0, 's', 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 's', 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'z', 0, 1, 1, 0, 0, 1], 
        [1, 0, 0, 0, 'z', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 'f', 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 'sh', 1, 1, 1, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 'ez', 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 'ez', 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 'f', 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 'lt', 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 'ez', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 's', 0, 0, 0, 1, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 'ez', 1, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],

]

let menu = true;
let fConsole = document.getElementById('console');
let entitiySpeed = 1;
let zombieHealth = 35;
let skeletonHealth = 35;
let skeletonPspeed = 8;
let skeletonPdamage = 5;
let zombieDamage = 5; 
let skeletonDamage = 5; 
let moneyScale = 1;
let knockBackResistance = 1;
let areaCount = 0 

document.addEventListener('error', (e) => {
    fConsole.classList.add('visible')
    println(e)
})

function println(input){
    fConsole.innerHTML += input + '<br>'
}

const createWall = (x, y, width, height)  => {
    structures.add(new wall(x, y, width, height))
}

const createTurret = (x, y, width, height, key) => {
    structures.add(new turret(x, y, width, height, key))
}

const createDummy = (x, y, width, height) => { //function to make dummys
    entities.add(new dummy(x, y, width, height))
}

const createZombie = (x, y, width, height) => { //function to make dummys
    entities.add(new zombie(x, y, 30, 30, character, entitiySpeed, zombieHealth, zombieDamage, knockBackResistance))
}

const createEvilZombie = (x, y, width, height) => { //function to make dummys
    entities.add(new evilZombie(x, y, 30, 30, character, entitiySpeed * 0.75, zombieHealth, zombieDamage * 1.5, knockBackResistance))
}

const createSkeleton = (x, y, width, height) => { //function to make dummys
    entities.add(new skeleton(x, y, 30, 30, character, entitiySpeed/2, skeletonHealth, skeletonDamage, skeletonPdamage, skeletonPspeed, knockBackResistance))
}

const createPortal = (x, y, width, height) => { //function to make dummys
    interactables.add(new portal(x, y, width, height, character))
}

const createShop = (x, y, width, height) => { //function to make dummys
    interactables.add(new shop(x, y, width, height, character))
}

const createForge = (x, y, width, height) => { //function to make dummys
    interactables.add(new forge(x, y, width, height, character))
}
const tiles = new Map([ //holds all the possible tiles and functions to build them
    [0, function(){
        return;
    }],
    [1, createWall],
    ['lt', createTurret],
    ['d', createDummy],
    ['z', createZombie],
    ['rt', createTurret],
    ['s', createSkeleton],
    ['p', createPortal],
    ['sh', createShop],
    ['f', createForge],
    ['ez', createEvilZombie],

])

const structures = { //loads structures
    list: [],
    add: function(entity){ //adds structures to the rendering
        entity.index = this.list.length;
        this.list.push(entity);
    },
    remove: function(index){ ///removes structures from rendering
        this.list.splice(index, 1);
    },
    draw: function (){ //draws all items 
        for(let i = 0; i < this.list.length; i++){
            this.list[i].draw();
        }
    },
    resetList: function(){
        this.list = []
    }, 
    check: function(){
        return true;
    }
}

const entities = { // loads entities
    list: [],
    add: function(entity){
        if(this.list.indexOf(null) != -1){
            entity.index = this.list.indexOf(null)
            this.list[this.list.indexOf(null)] = entity;
        }
        else{
            entity.index = this.list.length;
            this.list.push(entity)
        }
    },
    remove: function(index){
        this.list[index] = null;
    },
    draw: function (){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i]){
            this.list[i].draw();
            }
        }
    },
    clear: function(){
        this.list = []
    },
    check: function(entity, original){ //true means check
            if(original.iframes == 0){
                return true;
            }
            if(entity === null){
                return false;
            }
            if(entity.behavior == 'static'){ 
                return true;
            }
            if(entity.target.iFrames == 0){ 
                return true;
            }
            return false;
    }
}

const damageInstances = {
    list: [],
    add: function(entity){
        if(this.list.indexOf(null) != -1){
            entity.index = this.list.indexOf(null)
            this.list[this.list.indexOf(null)] = entity;
        }
        else{
            entity.index = this.list.length;
            this.list.push(entity)
        }
        return entity.index;
    },
    remove: function(index){
        this.list[index] = null;
    },
    draw: function (){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i]){
            this.list[i].draw();
            }
        }
    },
    clear: function(){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i]){
            this.list[i].animating = false;
            }
        }
        this.list = []
    }
    
}

const interactables = {
    list: [],
    add: function(entity){
        if(this.list.indexOf(null) != -1){
            entity.index = this.list.indexOf(null)
            this.list[this.list.indexOf(null)] = entity;
        }
        else{
            entity.index = this.list.length;
            this.list.push(entity)
        }
        return entity.index;
    },
    remove: function(index){
        this.list[index] = null;
    },
    draw: function (){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i]){
            this.list[i].draw();
            }
        }
    },
    clear: function(){
        this.list = []
    }
    
}

const timers = { //holds frame timers
    list: [],
    run: function(){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i].frames > 0){ //if frames left then remove 1
                this.list[i].frames -= 1;
            }
            else{ //if 0 frames execute code
                this.list[i].func()
                this.list[i] = null;
            }
        }
        this.list = this.list.filter(function(value){
            return value != null
        })
    },
}

function addFrameTimeout(func, frames){
    timers.list.push({func : func, frames : frames })
}

function toDegrees(radians) {
    return radians * (180 / Math.PI);
  }

function circularSub(number, otherNumber){
    if (otherNumber < 45){
        otherNumber += 360;
    }
    return number - otherNumber;
}

function getCorner(target, entity){ //takes finds the corner cord of the player, takes tl, tr, bl, br, ml, mr, mt, mb as inputs should maybe update to dynamically make enough points to cover the character
    switch(target){
        case "tl":
            return [entity.x, entity.y];
        case "tr":
            return [entity.x + entity.width, entity.y];
        case "bl":
            return [entity.x, entity.y + entity.height];
        case "br":
            return [entity.x + entity.width, entity.y + entity.height];
        case "ml":
             return [entity.x, entity.y + (entity.height / 2)];
        case "mr":
             return [entity.x + entity.width, entity.y + (entity.height / 2)];
        case "mt":
             return [entity.x + (entity.width / 2), entity.y];
        case "mb":
             return [entity.x + (entity.width / 2), entity.y + entity.height];
             //returns [x, y]
    }
}

function getPoints(num, object){ //returns an array of points to text for collision, needs some work on corners
    let xInc = object.width/num;
    let yInc = object.height/num;
    let result = []
    for(let i = 0; i <= num; i++){ 
        result.push(new point(object.x + xInc * i, object.y)) //top, starts top left
        result.push(new point(object.x + object.width - xInc * i, object.y + object.height)) //bottom, starts bottom right
        result.push(new point(object.x, object.y + object.height - yInc * i)) //left, starts bottom left
        result.push(new point(object.x + object.width, object.y + yInc * i)) //right, starts top right
    }
    return result;
}

function inSpace(cord){ //finds what square the cord [left, top] is in returns the cords of the space
    let y = 0
    let x = 0
    for(let i = 0; i < 10; i++){ //goes through the rows
        if(y > cord[1]){ //checks if in room
            for(let j = 0; j < 20; j++){ //goes through the columns, if I want to make larger rooms then im fucked 
                if(x > cord[0]){ //checks if in square
                    // console.log(''+ (x + width) + ', ' + (y - height))
                    return ''+ (x - width) + ', ' + (y - height); //returns the cords in string format
                }
                x+=width
            }
        }
        y += height; //increments room
    }
}

function createString(value, length){ //will craete a string with a certain number of sigits
    let result = ''
    for(let i = 0; i < length; i++){
        result += value
    }
    return result
}

function determineValue(input){ //will determine value to be returned of a random seed
    input += ''
    const digits = input.length;
    const max = Number(createString(9, digits))
    const intervals = Math.floor(max/(arguments.length - 1)) //interval between choices
    input = Number(input)
    for(let i = 1; i < arguments.length; i++){
        if(i == 1){ //start
            if(input >= 0 && input <= intervals){  //checks if the number is greater than equal to 0
                return arguments[i];
            }
        }
        else if(i + 1 == arguments.length){//finish
            if(input > intervals * (i - 1)){ //checks if the input is greater than the final interval
                return arguments[i];
            }
        }
        else{//all else
            if(input > intervals * (i-1) && input <= intervals * i){ //checks if the input is in between the last interval and the current
                return arguments[i];
            }
        }
    }
}

function determineValueArray(input, options){ //will determine value to be returned of a random seed
    input += ''
    const digits = input.length;
    const max = Number(createString(9, digits))
    const intervals = Math.floor(max/(options.length)) //interval between choices
    input = Number(input)
    for(let i = 0; i < options.length; i++){
        if(i == 0){ //start
            if(input >= 0 && input <= intervals){  //checks if the number is greater than equal to 0
                return options[i];
            }
        }
        else if(i + 1 == options.length){//finish
            if(input > intervals * i){ //checks if the input is greater than the final interval
                return options[i];
            }
        }
        else{//all else
            if(input > intervals * i && input <= intervals * (i+1)){ //checks if the input is in between the last interval and the current
                return options[i];
            }
        }
    }
}

function findDegrees(x1, y1, x2, y2){
    let x = x1 - x2;
    let y = y1 - y2;
    let radians = Math.atan(x/y);
    let degrees = toDegrees(radians);
    if(x1 < x2 && y1 > y2){
        degrees = Math.abs(degrees) + 270;
    }
    else if(x1 > x2 && y1 > y2){
        degrees = 90 -Math.abs(degrees) + 180;


    }
    else if(x1 > x2 && y1 < y2){
        degrees = Math.abs(degrees) + 90;
    }
    else{
        degrees = 90 - Math.abs(degrees);
    }
    return degrees;
}

function findDistance(x1, y1, x2, y2){
    let x = x1 - x2;
    let y = y1 - y2;
    return Math.sqrt(x * x + y * y)
}

function moveEntitiy(entitiy, xChange, yChange, skipEntities){
    entitiy.x += xChange
    entitiy.y += yChange
    if(collision2(entitiy, structures) || (collision2(entitiy, entities) && skipEntities != true)){
        entitiy.y -= yChange;
        entitiy.x -= xChange;
    }
}

function collision2(entitiy, target, collider) { //collider returns the item collided with instead of true
    let targetList = target.list
    const left = entitiy.x;
    const right = entitiy.x + entitiy.width;
    const top = entitiy.y;
    const bottom = entitiy.y + entitiy.height;
    
    for (let i = 0; i < targetList.length; i++) {
        if(((targetList[i] !== entitiy) && target.check(targetList[i], entitiy)) && targetList[i] != null){ //check for entities returns if it is static
            const tleft = targetList[i].x;
            const tright = targetList[i].x + targetList[i].width;
            const ttop = targetList[i].y;
            const tbottom = targetList[i].y + targetList[i].height;
            
            // Check if the rectangles are overlapping
            if (right > tleft && left < tright && bottom > ttop && top < tbottom) {
                // Collision detected
                if(collider == true){
                    return targetList[i]
                }
                return true;
                // You can add further collision handling logic here (e.g., bounce, stop movement, etc.)
                }
            }
        }
    return false;
}

function incrementLimit(variable, limit, increment = 1){
    variable+=increment;
    if(variable >= limit){
        return variable - limit
    }
    return variable;
}

class point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

function animate() {
    if (document.timeline.currentTime - lastUpdate > 1000 / fps && !menu) {
      lastUpdate = document.timeline.currentTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const floor = ctx.createPattern(document.getElementById('floor'), "repeat")
      ctx.fillStyle = floor;
      ctx.fillRect(0, 0, canvas.width, canvas.height); 
      character.preDraw();
      timers.run()
      structures.draw();
      entities.draw();
      interactables.draw();
      character.draw();
      damageInstances.draw();
      character.interact = false;
      roomChange(character)
    } 
    window.requestAnimationFrame(animate);
}

function setFPS(target){
    fps = target;
}

function updateWallet(increase, target){
    if(target.wallet != null){
        if(increase > 0){target.wallet += increase * moneyScale}
        else{target.wallet += increase}
        document.getElementById('walletDisplay').textContent = target.wallet;
    }
}

function velocity(entity, xVelocity, yVelocity){
    const temp = {
        x : entity.x,
        y : entity.y,
        width : entity.width,
        height : entity.height
    }
    if(character.has('bouncy')){
        temp.x += xVelocity
        if(collision2(temp, structures)){
            xVelocity *= -1
        }
        temp.x -= xVelocity
        temp.y += yVelocity * 2
        if(collision2(temp, structures)){
            yVelocity *= -1
        }
        temp.y -= yVelocity
        temp.x += xVelocity
        if(!collision2(temp, structures)){
            entity.x = temp.x
            entity.y = temp.y
        }
    }
    else{
    const steps = 20
    const xStep = xVelocity/steps
    const yStep = yVelocity/steps

    for(let i = 0; i < steps; i++){
        temp.x += xStep
        if(collision2(temp, structures)){
            temp.x -= xStep
            entity.xVelocity = 0
            break;
        }
    }
    for(let i = 0; i < steps; i++){
        temp.y += yStep
        if(collision2(temp, structures)){
            temp.y -= yStep
            entity.yVelocity = 0
            break;
        }
    }
    entity.x = temp.x
    entity.y = temp.y
    }
    if(xVelocity > 0){
        xVelocity *= 0.9
        if(xVelocity < 0.5){
            xVelocity = 0
        }
    }
    else{
        xVelocity *= 0.9
        if(xVelocity > -0.5){
            xVelocity = 0
        }
    }
    if(yVelocity > 0){
        yVelocity *= 0.9
        if(yVelocity < 0.5){
            yVelocity = 0
        }
    }
    else{
        yVelocity *= 0.9
        if(yVelocity > -0.5){
            yVelocity = 0
        }
    }
    entity.xVelocity = xVelocity
    entity.yVelocity = yVelocity
}

function roomChange(player){
    if(player.y < 0){
        structures.resetList();
        player.room.savedEntities = entities.list;
        entities.clear();
        player.room.savedInteractables = interactables.list;
        interactables.clear()
        damageInstances.clear();
        player.setRoom(player.room.top)
        player.y = window.innerHeight;
    }
    else if(player.y > window.innerHeight){
        structures.resetList();
        player.room.savedEntities = entities.list;
        entities.clear();
        player.room.savedInteractables = interactables.list;
        interactables.clear()
        damageInstances.clear();
        player.setRoom(player.room.bottom)
        player.y = 0;
    }
    else if(player.x < 0){
        structures.resetList();
        player.room.savedEntities = entities.list;
        entities.clear();
        player.room.savedInteractables = interactables.list;
        interactables.clear()
        damageInstances.clear();
        player.setRoom(player.room.left)
        player.x = window.innerWidth - player.width;
    }
    else if(player.x+player.width > window.innerWidth){
        structures.resetList();
        player.room.savedEntities = entities.list;
        entities.clear();
        player.room.savedInteractables = interactables.list;
        interactables.clear()
        damageInstances.clear();
        player.setRoom(player.room.right)
        player.x = 0;
    }
}

function getProjVelocities(degrees, speed){
    const result = {
        xVelocity: 0,
        yVelocity : 0
    }
    if(degrees >= 45 && degrees < 135){
        result.xVelocity = ((speed / 45) * degrees) - speed * 2 //((135 - 45) - degrees) / this.pVelocityModifier * -2
        result.yVelocity = speed * -1
    }
    else if(degrees >= 135 && degrees < 225){
        result.yVelocity = (((speed / 45) * (degrees - 90)) - speed * 2) //((225 - 45) - degrees) / this.pVelocityModifier * -2
        result.xVelocity = speed
    }
    else if(degrees >= 225 && degrees < 315){
        result.xVelocity = -(((speed / 45) * (degrees - 180)) - speed * 2)
        result.yVelocity = speed
    }
    else{
        if(degrees < 45){
            degrees += 360
        }
        result.yVelocity = -(((speed / 45) * (degrees - 270)) - speed * 2)//(circularSub((405 - 45), degrees)) / this.pVelocityModifier * 2
        result.xVelocity = speed * -1
    }
    return result;
}

function dropItems(item, target){
    const timeBeforeFade = 5000;
    const fadeTime = 0;
    if(target.materials){ //makes sure target has materials
        const amount = Math.floor(1 + Math.random() * 5)
        if(target.materials[item.name]){
            target.materials[item.name].amount += amount
        }
        else{
            target.materials[item.name] = {amount:amount, sprite: item.sprite != null || item.sprite != undefined ?  item.sprite : "images/Coin.png"}
        }
        const itemDisplay = document.createElement("div")
            const sprite = document.createElement("img")
                sprite.src =  target.materials[item.name].sprite
                sprite.style.marginRight = '5px'
        itemDisplay.appendChild(sprite)
            const text = document.createElement("div")
                text.textContent += `${amount} : ${item.name}`
        itemDisplay.appendChild(text)
        itemDisplay.classList.add('attainedItem')
        sideBar.appendChild(itemDisplay)
        setTimeout(()=>{
            itemDisplay.style.opacity = '0';
            setTimeout(() => {itemDisplay.remove()}, timeBeforeFade + fadeTime)
        }, timeBeforeFade)
    }
}