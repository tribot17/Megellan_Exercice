### STACKING EXERCICE

Correction de l'exercie stacking

## WARNING

ce smart contract n'est pas vraiment est nécessiterait des amélioration :

- L'utilisation de block.timestamp peut être manipulé, il serait donc possible de le récupérer via un oracle
- Stocker tous les aggregator dans le smart contract au lieu de laisser la posibilité à l'utilsateur de saisir le sien
- Eviter l'utilisation de la boucle for qui présente un pottentiel risque ou limiter sa taille (require array.length < 100)
