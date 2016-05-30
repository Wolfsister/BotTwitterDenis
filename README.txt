Le Bot Twitter fonctionne de la manière suivante : au lancement du Bot, un json contenant tous les ID des tweets auxquels le bot a déjà répondu est chargé. Le bot répond ensuite à tous les tweets dont l'id ne figure pas dans le json. A chaque réponse, le tweet a qui le bot a répondu est inscrit dans le json, et ce json est enregistré sur le serveur pour être chargé au prochain lancement du bot.

Le Bot possède plusieurs modes d'utilisation : 

- Si un utilisateur envoie le mot "contrepèterie" (le bot peut détecter le mot même s'il n'est pas très bien écrit), le Bot renverra une contrepèterie aléatoire écrite en dur dnas un json local

	ex : Alice envoie " @LO10Denis contrepeterie "
	     Bot répond " @Alice A la vue des nippons, la Chine se souleva " 	

- Si un utilisateur envoie "airQuality" suivi du nom de la ville entre guillemets, un appel à l'API Breezometer (https://breezometer.com/api/) sera effectué, et des informations sur la ville seront restituées.
	
	ex : Alice envoie " @LO10Denis airQuality "Troyes"  "
	     Bot répond " @Alice QI : 78 - Fair Air Quality in "troyes" "

- Si un utilisateur envoie le mot "pokémon", le bot renverra aléatoirement un nom de Pokémon en utilisant l'API "PokeAPI" (https://pokeapi.co/).

	ex : Alice envoie " @LO10Denis pokemon "
	     Bot répond " @Alice I guess you look like...Magneton ! "

- Si un utilisateur envoie le mot imdb suivi du nom d'un film ou d'une série entre guillemets, des informations sur ce film ou série seront restituées. Le premier tweet renverra le nom du réalisateur, de la date de sortie, l'évaluation du film, le genre du film et les deux acteurs principaux. Si le synopsis du tweet fait moins de 140 caractères (limite imposée par Twitter), un deuxième tweet avec le synopsis sera envoyé. Cette fonctionnalité utilise l'API OMDb (http://www.omdbapi.com/).

	ex : Alice envoie " @LO10Denis imdb "Se7en" "
	     Bot répond " @Alice Se7en(1995) by David Fincher with Morgan Freeman and Andrew Kevin Walker. Rated 8.6. Crime, Drama, Mystery. "
	     Bot répond également " @Alice Se7en : Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his modus operandi. "

- Si aucun des cas suivant ne convient au tweet envoyé au bot, le bot saluera simplement l'emetteur du tweet, dans une langue aléatoire (salutations en dur dans un json)

	ex : Alice envoie " @LO10Denis Bonjour ! "
	     Bot répond " Coucou @Alice !! "


