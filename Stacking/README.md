### STACKING EXERCICE

Correction de l'exercice stacking

## WARNING

ce smart contract nécessiterait des amélioration :

- L'utilisation de block.timestamp peut être manipulé, il serait donc possible de le récupérer via un oracle
- Stocker tous les aggregator dans le smart contract au lieu de laisser la possibilité à l'utilsateur de saisir le sien
- Éviter l'utilisation de la boucle for qui présente un potentiel risque ou limiter sa taille (require array.length < 100)
