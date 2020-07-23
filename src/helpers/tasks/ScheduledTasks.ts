class Task {
    private t: Function;
    constructor(a: Function) {
        this.t = a;
    }
    execute(args: any) {
        this.t.call(this.t, args);
    }
}

class ScheduledTask {
    private task: Task;
    private scheduledTime: number;

    constructor(t: Task, scheduledAt: number) {
        this.task = t;
        this.scheduledTime = scheduledAt;
    }

    checkAndExecute() {

    }
}

export default class ScheduledTasks {
//    private tasks: Array<ScheduledTask>
//    private interval: number;

}