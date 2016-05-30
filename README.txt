Le Bot Twitter fonctionne de la mani�re suivante : au lancement du Bot, un json contenant tous les ID des tweets auxquels le bot a d�j� r�pondu est charg�. Le bot r�pond ensuite � tous les tweets dont l'id ne figure pas dans le json. A chaque r�ponse, le tweet a qui le bot a r�pondu est inscrit dans le json, et ce json est enregistr� sur le serveur pour �tre charg� au prochain lancement du bot.

Le Bot poss�de plusieurs modes d'utilisation : 

- Si un utilisateur envoie le mot "contrep�terie" (le bot peut d�tecter le mot m�me s'il n'est pas tr�s bien �crit), le Bot renverra une contrep�terie al�atoire �crite en dur dnas un json local

	ex : Alice envoie " @LO10Denis contrepeterie "
	     Bot r�pond " @Alice A la vue des nippons, la Chine se souleva " 	

- Si un utilisateur envoie "airQuality" suivi du nom de la ville entre guillemets, un appel � l'API Breezometer (https://breezometer.com/api/) sera effectu�, et des informations sur la ville seront restitu�es.
	
	ex : Alice envoie " @LO10Denis airQuality "Troyes"  "
	     Bot r�pond " @Alice QI : 78 - Fair Air Quality in "troyes" "

- Si un utilisateur envoie le mot "pok�mon", le bot renverra al�atoirement un nom de Pok�mon en utilisant l'API "PokeAPI" (https://pokeapi.co/).

	ex : Alice envoie " @LO10Denis pokemon "
	     Bot r�pond " @Alice I guess you look like...Magneton ! "

- Si un utilisateur envoie le mot imdb suivi du nom d'un film ou d'une s�rie entre guillemets, des informations sur ce film ou s�rie seront restitu�es. Le premier tweet renverra le nom du r�alisateur, de la date de sortie, l'�valuation du film, le genre du film et les deux acteurs principaux. Si le synopsis du tweet fait moins de 140 caract�res (limite impos�e par Twitter), un deuxi�me tweet avec le synopsis sera envoy�. Cette fonctionnalit� utilise l'API OMDb (http://www.omdbapi.com/).

	ex : Alice envoie " @LO10Denis imdb "Se7en" "
	     Bot r�pond " @Alice Se7en(1995) by David Fincher with Morgan Freeman and Andrew Kevin Walker. Rated 8.6. Crime, Drama, Mystery. "
	     Bot r�pond �galement " @Alice Se7en : Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his modus operandi. "

- Si aucun des cas suivant ne convient au tweet envoy� au bot, le bot saluera simplement l'emetteur du tweet, dans une langue al�atoire (salutations en dur dans un json)

	ex : Alice envoie " @LO10Denis Bonjour ! "
	     Bot r�pond " Coucou @Alice !! "


