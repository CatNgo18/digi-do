import { createServer, Model, Factory, hasMany, belongsTo, Registry, Request } from 'miragejs';
import { faker } from '@faker-js/faker';
import { User, Pet, Task, TaskStatus } from '../types';
import { FactoryDefinition, ModelDefinition } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

type AppRegistry = Registry<
    {
        user: ModelDefinition<User>,
        pet: ModelDefinition<Pet>,
        task: ModelDefinition<Task>,
    },
    {
        user: FactoryDefinition<Partial<User>>,
        pet: FactoryDefinition<Partial<Pet>>,
        task: FactoryDefinition<Partial<Task>>,
    }
>
type AppSchema = Schema<AppRegistry>;

export function makeServer({ environment = "test" }) { // expected environment values: ["test", "dev"]
    return createServer({
        environment,

        factories: {
            user: Factory.extend<Partial<User>>({
                name() {
                    return "Test User";
                },
            }),
            pet: Factory.extend<Partial<Pet>>({
                name(i: number) {
                    return `Pet ${i}`;
                },
                title() {
                    return faker.lorem.sentence({min: 2, max: 5});
                },
                description() {
                    return faker.lorem.sentence({min: 0, max: 10});
                },
                hp() {
                    return faker.number.int({min: 0, max: 10});
                },
                retro() {
                    return faker.lorem.sentences({min: 0, max: 6});
                },
                garden() {
                    return faker.datatype.boolean();
                },
            }),
            task: Factory.extend<Partial<Task>>({
                title(i) {
                    return `Task ${i}`;
                },
                description() {
                    return faker.lorem.sentence({min: 0, max: 10});
                },
                dueDate() {
                    return faker.date.future();
                },
                status() {
                    return faker.helpers.enumValue(TaskStatus);
                },
            }),
        },

        models: {
            user: Model.extend({
                pets: hasMany(),
            }),
            pet: Model.extend({
                user: belongsTo(),
                tasks: hasMany(),
            }),
            task: Model.extend({
                pet: belongsTo(),
            }),
        },

        routes() {
            this.namespace = "api";

            // User endpoints

            this.get("users");

            // Given a userID, return a user
            this.get('/users/:userId', (schema: AppSchema, request: Request) => {
                return schema.find("user", request.params.userId);
            });

            // Given a userID, return a list of pets belonging to that user
            this.get('/users/:userId/pets', (schema: AppSchema, request: Request) => {
                return schema.where("pet", {
                    userId: parseInt(request.params.userId),
                });
            });

            // Given a userID, create a pet belonging to that user
            this.post('/users/:userId/pets', (schema: AppSchema, request: Request) => {
                let attrs = JSON.parse(request.requestBody);

                attrs = Object.assign({hp: 5, garden: false}, attrs);

                return schema.create("pet", {
                    userId: parseInt(request.params.userId),
                    ...attrs
                });
            });


            // Pet endpoints

            // Given a petID, return a pet
            this.get('/pets/:petId', (schema: AppSchema, request: Request) => {
                return schema.find("pet", request.params.petId);
            });

            // Given a petID, return a list of tasks belonging to that pet
            this.get('/pets/:petId/tasks', (schema: AppSchema, request: Request) => {
                return schema.where("task", {
                    petId: parseInt(request.params.petId),
                });
            });

            // Given a petID, create a task belonging to that pet
            this.post('/pets/:petId/tasks', (schema: AppSchema, request: Request) => {
                let attrs = JSON.parse(request.requestBody);

                return schema.create("task", {
                    petId: parseInt(request.params.petId),
                    ...attrs
                });
            });

            // Given a petID, update the pet's information
            this.put('/pets/:petId', (schema: AppSchema, request: Request) => {
                let attrs = JSON.parse(request.requestBody);

                schema.find("pet", request.params.petId)?.update(attrs);

                return {pet: attrs};
            });

            // Given a petID, delete the pet from the table
            this.del('/pets/:petId', (schema: AppSchema, request: Request) => {
                let pet = schema.find("pet", request.params.petId);

                /* @ts-ignore */
                pet?.tasks.destroy();
                pet?.destroy();

                return pet;
            });

            // Given their petIDs, delete multiple pets from the table
            this.del('/pets', (schema: AppSchema, request: Request) => {
                let petIds = JSON.parse(request.requestBody);

                petIds.forEach((petId: number) => {
                    let pet = schema.find("pet", `${petId}`);

                    /* @ts-ignore */
                    pet?.tasks.destroy();
                    pet?.destroy();
                });

                return petIds;
            });


            // Task endpoints

            // Given a taskID, return a task
            this.get('/tasks/:taskId', (schema: AppSchema, request: Request) => {
                return schema.find("task", request.params.taskId);
            });

            // Given a taskID, update the task's information
            this.put('/tasks/:taskId', (schema: AppSchema, request: Request) => {
                let attrs = JSON.parse(request.requestBody).task;

                schema.find("task", request.params.taskId)?.update(attrs);

                return attrs;
            })

            // Given a taskID, delete the task from the table
            this.del('/tasks/:taskId', (schema: AppSchema, request: Request) => {
                let task = schema.find("pet", request.params.taskId);

                task?.destroy();

                return task;
            });
        },

        seeds(server) {
            // Create 6 pets
            let pets = server.createList("pet", 6);

            // Create 2 tasks for each pet
            pets.forEach((pet) => {
                server.createList("task", 2, { pet })
            });

            // Create user who owns previously created pets
            server.create("user", { pets })
        },
    });
}