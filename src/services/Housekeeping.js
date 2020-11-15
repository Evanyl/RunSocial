import WorkoutService from './WorkoutService';
import RunnerService from './RunnerService';

class Housekeeping {
    checkKeys() {
        
        WorkoutService.checkEmpty();
        const res = new Promise(RunnerService.checkValidKey());
        return res;
    }
}

export default new Housekeeping();