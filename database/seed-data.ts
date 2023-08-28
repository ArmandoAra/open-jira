// Aqui va a estar la informacion que se va a insertar en la base de datos automaticamente
// cuando se ejecute el comando npm run seed
// Esto tambien ayuda a otros desarrolladores a entender mejor la estructura de la base de datos


interface SeedData {
    entries: SeedEntries[];
}

interface SeedEntries {
    description: string;
    created_at: Number;
    status: string;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
            created_at: Date.now(),
            status: 'pending',
        },
        {
            description: 'Agregamos una nueva tarea para ver si se muestra en la lista de tareas.',
            created_at: Date.now() - 1000000,
            status: 'done',
        },
        {
            description: 'Vamos a escribir otra tarea que sea diferente a las demás.',
            created_at: Date.now() - 2000000,
            status: 'in-progress',
        },
    ]
}