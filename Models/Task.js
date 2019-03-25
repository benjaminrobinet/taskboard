class TaskModel{}

TaskModel.schema = {
    name: 'Task',
    properties: {
        id: {type: 'string', indexed: true},
        title: 'string',
        content: 'string?',
        created_at: 'date',
        updated_at: 'date',
        done: {type: 'bool', default: false},
    }
};

export default TaskModel;