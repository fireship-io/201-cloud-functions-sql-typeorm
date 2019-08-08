import * as functions from 'firebase-functions';
import { connect } from './config';

import { Hippo } from './entity/Hippo';
import { Hat } from './entity/Hat';


export const getHippos = functions.https.onRequest(async (request, response) => {


    const connection = await connect();
    const hippoRepo = connection.getRepository(Hippo);


    // Count records
    // const count = await hippoRepo.count();

    // // Get all 
    const allHippos = await hippoRepo.find();

    // Raw SQL Query
    // const query = await hippoRepo.query('SELECT name FROM hippo WHERE WEIGHT > 5');


    // const hipposWearingHats = await hippoRepo
    //                             .createQueryBuilder('hippo')
    //                             .leftJoinAndSelect('hippo.hats', 'hat')
    //                             .getMany();

    response.send(allHippos);

});


export const createHippo = functions.https.onRequest(async (request, response) => {

    const { name, weight } = request.body;

    try {
        const connection = await connect();

        const repo = connection.getRepository(Hippo);

        const newHippo = new Hippo();
        newHippo.name = name;
        newHippo.weight = weight;


        const savedHippo = await repo.save(newHippo);

        response.send(savedHippo);

    } catch (error) {
        response.send(error)
    }

});


export const createHat = functions.https.onRequest(async (request, response) => {

    const { owner, color } = request.body;

    try {
        const connection = await connect();
        const repo = connection.getRepository(Hat);

        const newHat = new Hat();
        newHat.owner = owner;
        newHat.color = color;

        const savedHat = await repo.save(newHat);
        response.send(savedHat);

    } catch (error) {
        response.send(error)
    }
});
