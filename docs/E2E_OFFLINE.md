# Test E2E manuel — Mode Hors Ligne (Airplane Mode)

Ce protocole vérifie que l'application fonctionne complètement hors ligne et que la synchronisation reprend sans erreurs realtime à la reconnexion.

## Prérequis
- App publiée (URL `.lovable.app` ou domaine custom) — **PAS** la preview en iframe (Service Worker désactivé en preview)
- Première connexion en ligne pour mettre en cache les assets et seeder les credentials admin
- Compte: `admin` / `12345678`

## Scénario 1 — PWA Mobile (mode avion)

1. **En ligne** : Ouvrir l'app dans Chrome/Safari mobile, se connecter avec admin, naviguer sur Dashboard, Membres, Paramètres (pour cacher les données)
2. Installer la PWA (bouton "Ajouter à l'écran d'accueil")
3. Fermer complètement le navigateur ET la PWA (force quit)
4. **Activer le mode avion** ✈️
5. Ouvrir la PWA depuis l'icône d'accueil
   - ✅ L'écran de login doit s'afficher (PAS d'écran blanc)
   - ✅ Badge **"Hors ligne"** rouge visible
6. Se connecter avec `admin` / `12345678`
   - ✅ Connexion accepte (auth offline via cache)
7. Naviguer dans le menu : Dashboard, Membres, Cotisations
   - ✅ Données en cache visibles
   - ✅ Aucune erreur console `subscribe` ou `postgres_changes`
8. Ajouter un nouveau membre
   - ✅ Sauvegarde en file (badge compteur orange `1`)
9. **Désactiver le mode avion**
   - ✅ Badge passe à "En ligne" vert
   - ✅ Badge realtime `n/n` apparaît (canaux connectés)
   - ✅ Compteur file diminue à `0` automatiquement (ou via clic sync)
   - ✅ Le membre ajouté est bien présent côté serveur

## Scénario 2 — Navigateur Desktop (DevTools Offline)

1. Ouvrir l'app publiée dans Chrome desktop, se connecter
2. F12 → Application → Service Workers → vérifier que `sw.js` est `activated`
3. Network → cocher **Offline**
4. F5 (recharger)
   - ✅ L'app charge depuis le cache (pas d'écran blanc)
   - ✅ Login fonctionne offline
5. Naviguer entre les pages
   - ✅ Console : aucune erreur `cannot add postgres_changes callbacks`
   - ✅ Console : logs `[realtime] network offline -> tearing down channels`
6. Décocher Offline
   - ✅ Console : logs `[realtime] network online -> resubscribing N channels`
   - ✅ Pas d'erreur double-subscribe

## Scénario 3 — React StrictMode (dev)

1. Lancer `bun dev` (StrictMode actif)
2. Ouvrir la console
   - ✅ Chaque hook log `[realtime] subscribe -> tbl:xxx` une seule fois par table (le manager déduplique)
   - ✅ Aucun log `cannot add postgres_changes callbacks for realtime:... after subscribe()`

## Critères d'acceptation
- [ ] Aucun écran blanc en mode avion (PWA + navigateur)
- [ ] Login offline fonctionne (admin/12345678)
- [ ] Navigation complète offline sans erreur
- [ ] Ajout/modification de données en file
- [ ] Sync auto à la reconnexion
- [ ] Aucune erreur realtime dans la console (StrictMode + reconnexion)
