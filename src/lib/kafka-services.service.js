export const fetchServices = async() => {
  return [
    {
      id: '2ba02833-2fe2-4799-a1ee-0ee347b900ef',
      name: 'zookeeper',
      version: '3.5.5',
      status: 'UP',
      configuration: {
        url: 'http://localhost:2181'
      }
    },
    {
      id: 'bc00e3ea-ceb9-4f5c-a369-964b14dc947d',
      name: 'kafka',
      version: '2.4.1',
      status: 'UP',
      configuration: {
        url: 'http://localhost:9092'
      }
    },
    {
      id: '6c1f78ba-681e-4738-86a2-3892d97b85d2',
      name: 'kafka-rest',
      version: '5.5.1',
      status: 'UP',
      configuration: {
        url: 'http://localhost:8082'
      }
    },
    {
      id: '759de2c9-80d1-4216-88bd-19ace7ab3df9',
      name: 'kafka-connect',
      version: '5.5.1',
      status: 'UP',
      configuration: {
        url: 'http://localhost:8083'
      }
    },
    {
      id: '11ce6406-111f-4697-86e0-5b64a88e7644',
      name: 'ksql',
      version: '5.5.1',
      status: 'UP',
      configuration: {
        url: 'http://localhost:9098'
      }
    },
    {
      id: '6d65704e-ebbc-4eb4-98ba-d128455ddfb5',
      name: 'schema-registry',
      version: '5.5.1',
      status: 'UP',
      configuration: {
        url: 'http://localhost:8081'
      }
    },
    {
      id: 'a55f5f6d-29a9-4b61-bca5-28d0cebe4797',
      name: 'control-center',
      version: '5.5.1',
      status: 'DOWN',
      configuration: {
        url: 'http://localhost:9021'
      }
    }
  ];
}

export const restartServiceById = (serviceId) => new Promise((resolve) => {
  setTimeout(() => {
    resolve({code: 0, message: 'restart success', serviceId});
  }, 3000);
});