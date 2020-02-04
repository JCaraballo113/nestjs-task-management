import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';

const mockUser = { id: 12, userName: 'TESTUSER' };

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn()
});

describe('Task Service', () => {
    let tasksService;
    let taskRepository;

    beforeEach(async () => {
        const testModule = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository }
            ]
        }).compile();

        tasksService = await testModule.get<TasksService>(TasksService);
        taskRepository = await testModule.get<TaskRepository>(TaskRepository);
    });

    describe('getTasks', () => {
        it('gets all tasks from the repository', async () => {
            taskRepository.getTasks.mockResolvedValue('someValue');

            expect(taskRepository.getTasks).not.toHaveBeenCalled();

            const filters: GetTasksFilterDto = {
                status: TaskStatus.IN_PROGRESS,
                search: 'Some search query'
            };
            const result = await tasksService.getTasks(filters, mockUser);
            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        });
    });

    describe('getTaskById', () => {
        it('calls taskRepository.findOne() and successfully retrieve and return the task.', async () => {
            const mockTask = {
                title: 'Test task',
                description: 'Test desc'
            };
            taskRepository.findOne.mockResolvedValue(mockTask);

            const result = await tasksService.getTaskById(1, mockUser);
            expect(result).toEqual(mockTask);

            expect(taskRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: 1,
                    userId: mockUser.id
                }
            });
        });

        it('throws an error if task is not found', () => {
            taskRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow();
        });
    });

    describe('createTask', () => {
        it('calls taskRepository.createTask and returns a created task', async () => {
            taskRepository.createTask.mockResolvedValue('someTask');
            const mockTask = {
                title: 'Test task',
                description: 'Test desc'
            };
            expect(taskRepository.createTask).not.toHaveBeenCalled();
            const result = await tasksService.createTask(mockTask, mockUser);
            expect(taskRepository.createTask).toHaveBeenCalledWith(
                mockTask,
                mockUser
            );

            expect(result).toEqual('someTask');
        });
    });
});
