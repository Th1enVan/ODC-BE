import request from "supertest";
import app from "../app";
import { AppDataSource } from "../database";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Task API", () => {
  let taskId: number;

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        name: 'Test Task',
        startDate: '2023-07-01',
        endDate: '2023-07-02'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Task');
    taskId = response.body.id;
  });

  it('should get all tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update a task', async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({
        name: 'Updated Task',
        startDate: '2023-07-05',
        endDate: '2023-07-06'
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Task');
  });

  it('should delete a task', async () => {
    const response = await request(app).delete(`/api/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task deleted successfully');
  });
});