const localAdress = require ("./adressDb.json");

const SampleEvent = [
    {
        "name":"PAR DELA LES PEUPLIERS",
        "type":"Spectacles",
        "localName":localAdress["Ecomusee"].localName,
        "localAdress":localAdress["Ecomusee"].adress,
        "eventDate":new Date('2024-01-27T19:33:45.000Z'),
        "description":
`Gustave, Fernand et René résident tous les trois dans un hospice pour anciens combattants. Ils passent l'essentiel de leur journée sur la terrasse à prendre l'air. Pas la terrasse principale, mais celle de derrière, plus isolée et plus intime qui offre une vue imprenable sur une colline couverte de peupliers. Entre discussions, souvenirs et soif d'ailleurs, les trois hommes rêvent de partir voir ce qui se trouve derrière les peupliers. Mais arriveront-ils seulement à tenter cette aventure?
Un spectacle mêlant avec une tendresse infinie humour et poésie.
        `,
        // NB : créer une table actorRole pour associé les role
        "actorRole":[ // Mariadb peut marcher avec ce type de json avec [{}] ?
            {
                "role":"René",
                "actor":"Marc Laurence"
            },
            {
                "role":"Fernand",
                "actor":"Jean-Yves Lefebvre"
            },
            {
                "role":"Gustave",
                "actor":"Jean-Pierre Rebeillard"
            }
        ],
        "directing":["Romain PIERROT"],
        "price":localAdress["Ecomusee"].placePrice,
        "localContactName":localAdress["Ecomusee"].contact.name,
        "localContactPhone":localAdress["Ecomusee"].contact.phone,
        "localContactEmail":localAdress["Ecomusee"].contact.email,
        "localContactWebsite":localAdress["Ecomusee"].contact.website
    },
    {
        "name":"LES FÂCHEUX de Molière",
        "type":"Spectacles",
        "localName":localAdress["T4S"].localName,
        "localAdress":localAdress["T4S"].adress,
        "eventDate":new Date('2024-03-18T18:00:00.000Z'),
        "creationDate":new Date(`1662-08-17T10:00:00.000Z`),
        "description":
`En partenariat avec le Conservatoire de Musique de Gradignan

Mise en scène : Thelma PETIT
Mise en Musique : Maxime Bel’Air (chansons) & Olivier Ferrand (la courante de Lysandre)

Resituée dans un hôpital, la pièce suit le jeune interne Eraste, qui tente de rejoindre secrètement sa bien-aimée, Orphise, malgré les interventions incessantes de patients fâcheux et la désapprobation de Damis, oncle d’Orphise et… chef de service !`,
        // NB : créer une table actorRole pour associé les role
        "actorRole":[ // Mariadb peut marcher avec ce type de json avec [{}] ?
            {
                "role":"ÉRASTE",
                "actor":"Pablo Espada"
            },
            {
                "role":"LA MONTAGNE",
                "actor":"Etienne Roulland"
            },
            {
                "role":"ORPHISE",
                "actor":"Fanny Le Campion"
            },
            {
                "role":"DORANTE",
                "actor":"Sébastien Alvarez"
            },
            {
                "role":"LYSANDRE",
                "actor":"Jean-Yves Lefebvre"
            },
            {
                "role":"ALCANDRE",
                "actor":"Marc Laurence"
            },
            {
                "role":"ALCIPPE",
                "actor":"Monique Dardères"
            },
            {
                "role":"ORANTE",
                "actor":"Margaux Ancele"
            },
            {
                "role":"CLYMENE",
                "actor":"Claire Saugnac"
            },
            {
                "role":"FILINTE",
                "actor":"Patricia Gutierrez"
            },
            {
                "role":"DAMIS",
                "actor":"Denys Breysse"
            }
            
        ],
        "directing":["Thelma PETIT"],
        "price":localAdress["T4S"].placePrice,
        "localContactName":localAdress["T4S"].contact.name,
        "localContactPhone":localAdress["T4S"].contact.phone,
        "localContactEmail":localAdress["T4S"].contact.email,
        "localContactWebsite":localAdress["T4S"].contact.website
    },
    {
        "name":"LA SORTIE AU THEÂTRE",
        "type":"Spectacles",
        "localName":localAdress["Ecomusee"].localName,
        "localAdress":localAdress["Ecomusee"].adress,
        "eventDate":new Date(`2024-04-14T15:00:00.000Z`),
        "description":
`Une histoire drôle, étonnante, parfois grinçante.
Dégustation boissons et gâteaux après le spectacle.`,
        "actorRole":[],
        "Author":"Karl Valentin",
        "directing":["Romain PIERROT"],
        "price":localAdress["Ecomusee"].placePrice,
        "localContactName":localAdress["Ecomusee"].contact.name,
        "localContactPhone":localAdress["Ecomusee"].contact.phone,
        "localContactEmail":localAdress["Ecomusee"].contact.email,
        "localContactWebsite":localAdress["Ecomusee"].contact.website
    },    
    {
        "name":"LA CERISAIE de Tchekhov",
        "type":"Spectacles",
        "localName":localAdress["T4S"].localName,
        "localAdress":localAdress["T4S"].adress,
        "eventDate":new Date(`2024-06-02T19:00:00.000Z`),
        "description":
`A CERISAIE de Tchekhov.
Première mise en scène Jérémy NARDOT pour le Théâtre du Nonchaloir`,
        "orginalAuthor":"Jérémy NARDOT",
        "actorRole":[{
                "role":"René",
                "actor":"Marc Laurence"
            },
            {
                "role":"Fernand",
                "actor":"Jean-Yves Lefebvre"
            },
            {
                "role":"Gustave",
                "actor":"Jean-Pierre Rebeillard"
            }
        ],
        "directing":["Jérémy NARDOT"],
        "price":localAdress["T4S"].placePrice,
        "localContactName":localAdress["T4S"].contact.name,
        "localContactPhone":localAdress["T4S"].contact.phone,
        "localContactEmail":localAdress["T4S"].contact.email,
        "localContactWebsite":localAdress["T4S"].contact.website
    },
    {
        "name":"SPECTACLES DE FIN D'ANNEE",
        "type":"Spectacles",
        "localName":localAdress["Solarium"].localName,
        "localAdress":localAdress["Solarium"].adress,
        "eventDate":new Date(`2024-06-22T20:00:00.000Z`),
        "description":
`2 mises en scène de Romain PIERROT et Jérémy Nardot`,
        "actor":[],
        "directing":["Romain PIERROT","Jérémy NARDOT"],
        "price":localAdress["Solarium"].placePrice,
        "localContactName":localAdress["Solarium"].contact.name,
        "localContactPhone":localAdress["Solarium"].contact.phone,
        "localContactEmail":localAdress["Solarium"].contact.email,
        "localContactWebsite":localAdress["Solarium"].contact.website
    }
];
// Export
module.exports = SampleEvent;

// Info Price - Description
    // Student
//  Prix:12€ / Etudiants (Moins de 26 ans) :8€ / Adhérents: Gratuit / 
// Tarif groupe: 10€ (hors toute autre réduction - totalité des billets du groupe payable en une seule fois)
    // Junior
//  Prix:12€ / Adhérents:5€ / Moins de 18 ans:8€ / Groupe (à partir de 5 pers.):10€