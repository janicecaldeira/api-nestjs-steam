import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './users/user.entity';
import { Game } from './games/game.entity';

createConnection()
  .then(async (connection) => {
    console.log('Inserindo um novo usuário no banco de dados');
    const user = new User();
    user.email = 'teste@teste.com';
    user.username = 'user1';
    user.password = '12345';
    user.country = 'Brasil';
    user.age = 20;

    const game = new Game();
    game.title = 'FIFA';
    game.genre = 'Esporte';
    game.release_date = '01/03/2015';

    user.addGames(game);
    game.addUsers(user);

    const userRepository = connection.getRepository(User);

    await userRepository.save(user);

    const users = await userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.game', 'game')
      .getMany();

    console.log('Loaded users: ', users);

    users.forEach((user) => {
      console.log('Games: ', user.games);
    });
  })
  .catch((error) => console.log(error));
