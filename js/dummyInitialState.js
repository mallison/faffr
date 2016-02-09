import getID from './utils/getID';

const SLOTS = [
  {
    duration: 45,
    task: 'workout',
    note: `3x10 pistol squats
3x10 single leg Romanian deadlifts
2x10 split squats
3x10 hang knee raises
1x2 minute abs`
  },
  {
    duration: 120,
    task: 'coding',
    note: ''
  },
  {
    duration: 15,
    task: 'admin',
    note: ''
  },
  {
    duration: 30,
    task: 'lunch',
    note: ''
  },
  {
    duration: 180,
    task: 'coding',
    note: ''
  },
  {
    duration: 33,
    task: 'workout',
    note: ''
  },
  {
    duration: 10,
    task: 'afk',
    note: ''
  }
];

let start = new Date();
start.setHours(7);
start.setMinutes(30);
let delta = 0;
SLOTS.forEach(s => {
  s.start = new Date(start.getTime() + delta * 60000);
  delta += s.duration;
  s.id = getID();
});

export default SLOTS;
