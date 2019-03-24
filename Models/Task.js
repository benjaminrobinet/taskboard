class TaskModel {
    // Getters
    get title() {
        return this.title;
    }

    get content() {
        return this.content;
    }

    get createdAt() {
        return this.created_at;
    }

    get updatedAt() {
        return this.updated_at;
    }

    get progress() {
        return this.progress;
    }

    get status() {
        return value === 100;
    }

    // Setters
    set progress(value) {
        if(value > 100){
            throw "Progress can't be higher than 100";
        } else if (value < 0) {
            throw "Progress can't be lower than 100";
        } else {
            this.progress = value;
        }
    }
}

TaskModel.schema = {
    name: 'Task',
    properties: {
        title: 'string',
        content: 'string?',
        created_at: 'date',
        updated_at: 'date',
        progress: {type: 'int', default: 0},
    }
};

export default TaskModel;