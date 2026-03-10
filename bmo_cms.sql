-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 09 mars 2026 à 10:02
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bmo_cms`
--

-- --------------------------------------------------------

--
-- Structure de la table `Article`
--

CREATE TABLE `Article` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `status` enum('brouillon','publie','planifie') NOT NULL DEFAULT 'brouillon',
  `author` varchar(191) NOT NULL,
  `authorAvatar` varchar(191) DEFAULT NULL,
  `date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `readTime` int(11) NOT NULL DEFAULT 1,
  `image` varchar(191) DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`)),
  `metaTitle` varchar(191) DEFAULT NULL,
  `metaDescription` text DEFAULT NULL,
  `publishedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `categoryId` varchar(191) DEFAULT NULL,
  `userId` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `Article`
--

INSERT INTO `Article` (`id`, `title`, `slug`, `excerpt`, `status`, `author`, `authorAvatar`, `date`, `readTime`, `image`, `content`, `metaTitle`, `metaDescription`, `publishedAt`, `createdAt`, `updatedAt`, `categoryId`, `userId`) VALUES
('cmmah10wd000bsbm4i6elw2tc', 'B-MO lance le retrait sans carte aux GAB UBA', 'b-mo-lance-le-retrait-sans-carte-aux-gab-uba', 'Une innovation majeure permettant aux utilisateurs B-MO de retirer de l\'argent aux guichets automatiques UBA sans avoir besoin d\'une carte bancaire.', 'publie', 'Admin B-MO', NULL, '2025-01-25 00:00:00.000', 1, '/uploads/1772555029449-9gnro0c6qb6.png', '\"<p>B-MO lance le retrait sans carte aux GAB UBA. Une innovation majeure pour l\'inclusion financière au Bénin.</p>\"', NULL, NULL, NULL, '2026-03-03 10:34:44.557', '2026-03-03 16:23:49.453', 'cmmah10hu0003sbm44aw8cyis', 'cmmah10w70009sbm4wqgzllr9'),
('cmmah10wh000dsbm410ujilu2', 'Partenariat SBEE : Payez vos factures d\'électricité avec B-MO', 'partenariat-sbee--payez-vos-factures-delectricite-avec-b-mo', 'B-MO simplifie le paiement de vos factures SBEE. Découvrez comment régler vos factures prépayées et postpayées en quelques clics.', 'publie', 'Admin B-MO', NULL, '2025-01-18 00:00:00.000', 1, '/uploads/1772649712527-zkc24fovqso.png', '\"<p>Partenariat SBEE : Payez vos factures d\'électricité avec B-MO en quelques clics.</p>\"', NULL, NULL, NULL, '2026-03-03 10:34:44.561', '2026-03-04 18:41:52.616', 'cmmah10ho0002sbm4g6tlq2l4', 'cmmah10w70009sbm4wqgzllr9'),
('cmmah10wk000fsbm40cm7ykmc', 'Guide complet : Transférer vers MTN MoMo et Moov Money', 'guide-complet--transferer-vers-mtn-momo-et-moov-money', 'Apprenez à effectuer des transferts vers tous les opérateurs Mobile Money du Bénin depuis votre compte B-MO.', 'publie', 'Admin B-MO', NULL, '2025-01-10 00:00:00.000', 1, '/uploads/1772717443323-jld0guggqg.png', '\"<p>Guide complet pour transférer vers MTN MoMo et Moov Money depuis B-MO.</p>\"', NULL, NULL, NULL, '2026-03-03 10:34:44.564', '2026-03-05 13:30:43.332', 'cmmah10hj0001sbm4d61ryk4a', 'cmmah10w70009sbm4wqgzllr9'),
('cmmah10wo000hsbm4u5yjph8c', '158 agences partenaires : B-MO étend son réseau', '158-agences-partenaires--b-mo-etend-son-reseau', 'Avec 7 microfinances partenaires et plus de 158 agences, B-MO est désormais accessible dans toutes les régions du Bénin.', 'publie', 'Admin B-MO', NULL, '2025-01-05 00:00:00.000', 1, '/uploads/1772649770847-mv4cagywvc.png', '\"<p>158 agences partenaires : B-MO étend son réseau de microfinances.</p>\"', NULL, NULL, NULL, '2026-03-03 10:34:44.568', '2026-03-06 11:16:06.713', 'cmmah10hj0001sbm4d61ryk4a', 'cmmah10w70009sbm4wqgzllr9'),
('cmmah10wt000jsbm4t3l6lmaa', 'Comment B-MO protège vos transactions', 'comment-b-mo-protege-vos-transactions', 'Découvrez les mesures de sécurité avancées mises en place pour protéger vos données et transactions financières.', 'publie', 'Admin B-MO', NULL, '2024-12-28 00:00:00.000', 1, '/uploads/1772718276272-jtsxifygk2c.png', '\"<p>Comment B-MO protège vos transactions et données personnelles.</p>\"', NULL, NULL, NULL, '2026-03-03 10:34:44.573', '2026-03-05 13:44:36.284', 'cmmah10hu0003sbm44aw8cyis', 'cmmah10w70009sbm4wqgzllr9'),
('cmmah10ww000lsbm47eey03es', 'Créer son compte B-MO en 2 minutes avec *890#', 'creer-son-compte-b-mo-en-2-minutes-avec-890', 'Pas besoin de smartphone ! Suivez notre guide pour créer votre compte B-MO simplement avec le code USSD *890#.', 'publie', 'Admin B-MO', NULL, '2024-12-20 00:00:00.000', 1, '/uploads/1772795819920-jdsqeuil4p.jpg', '\"<p>Créer son compte B-MO en 2 minutes avec le code USSD *890#.</p>\"', NULL, NULL, NULL, '2026-03-03 10:34:44.577', '2026-03-06 11:16:59.925', 'cmmah10hj0001sbm4d61ryk4a', 'cmmah10w70009sbm4wqgzllr9'),
('cmmah10x0000nsbm4v4lxrwap', 'B-MO au Forum de l\'Inclusion Financière 2024', 'b-mo-au-forum-de-linclusion-financiere-2024', 'Retour sur notre participation au Forum National de l\'Inclusion Financière et nos engagements pour démocratiser l\'accès aux services financiers.', 'publie', 'Admin B-MO', NULL, '2024-12-15 00:00:00.000', 1, '/uploads/1772795881358-mupbctfahms.png', '\"<p>B-MO au Forum de l\'Inclusion Financière 2024.</p>\"', NULL, NULL, NULL, '2026-03-03 10:34:44.581', '2026-03-06 11:18:01.368', 'cmmah10hx0004sbm4yplios6o', 'cmmah10w70009sbm4wqgzllr9'),
('cmmah10x4000psbm4gu7c338l', 'Solution de paiement de masse pour les entreprises', 'solution-de-paiement-de-masse-pour-les-entreprises', 'Simplifiez le versement des salaires, bourses et pensions avec notre solution de paiement de masse B-MO.', 'publie', 'Admin B-MO', NULL, '2024-12-08 00:00:00.000', 1, '/uploads/1772795925442-utounj5avu.png', '\"<p>Solution de paiement de masse pour les entreprises avec B-MO.</p>\"', NULL, NULL, NULL, '2026-03-03 10:34:44.585', '2026-03-06 11:18:55.650', 'cmmah10hu0003sbm44aw8cyis', 'cmmah10w70009sbm4wqgzllr9'),
('cmmah10x8000rsbm4vjy65y6o', 'Nouvelle version de l\'application B-MO disponible', 'nouvelle-version-de-lapplication-b-mo-disponible', 'Interface repensée, nouvelles fonctionnalités et performances améliorées. Mettez à jour votre application dès maintenant.', 'publie', 'Admin B-MO', NULL, '2024-12-01 00:00:00.000', 1, '/uploads/1772795787702-rn07jyabkj.jpg', '\"<p>Nouvelle version de l\'application B-MO disponible sur le Play Store.</p>\"', NULL, NULL, NULL, '2026-03-03 10:34:44.588', '2026-03-06 11:18:26.478', 'cmmah10hj0001sbm4d61ryk4a', 'cmmah10w70009sbm4wqgzllr9'),
('cmmah10xi000xsbm4fkhha990', 'Maîtriser Tailwind CSS en production', 'maitriser-tailwind-css-en-production', 'Stratégies avancées pour optimiser, purger et déployer Tailwind CSS dans des applications à grande échelle.', 'publie', 'Audry', 'https://i.pravatar.cc/150?img=4', '2024-12-01 00:00:00.000', 1, 'https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?w=800&q=80', '\"<h2>1. Le problème du CSS en production</h2><p>Sans optimisation, un projet Tailwind peut générer des milliers de classes inutilisées.</p>\"', NULL, NULL, NULL, '2026-03-03 10:34:44.599', '2026-03-06 11:19:18.943', 'cmmah10ib0007sbm4haqssj5j', 'cmmah10w70009sbm4wqgzllr9'),
('cmmah10xm000zsbm4fpal1u1g', 'Pourquoi nous avons migré vers Linear', 'migration-linear', 'Retour d\'expérience sur notre migration de Jira vers Linear et l\'impact sur la productivité de l\'équipe.', 'publie', 'Audry', 'https://i.pravatar.cc/150?img=4', '2024-12-15 00:00:00.000', 5, 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80', '[{\"type\":\"heading\",\"text\":\"1. Les limites de Jira à grande échelle\"},{\"type\":\"paragraph\",\"text\":\"Après 3 ans sur Jira, notre équipe passait plus de temps à configurer des workflows qu\'à livrer de la valeur.\"}]', NULL, NULL, NULL, '2026-03-03 10:34:44.602', '2026-03-06 11:18:52.124', 'cmmah10i80006sbm4nn9n2p6i', 'cmmah10w70009sbm4wqgzllr9');

-- --------------------------------------------------------

--
-- Structure de la table `Category`
--

CREATE TABLE `Category` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `color` varchar(191) NOT NULL DEFAULT '#2563EB',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `Category`
--

INSERT INTO `Category` (`id`, `name`, `slug`, `description`, `color`, `createdAt`, `updatedAt`) VALUES
('cmmah10hj0001sbm4d61ryk4a', 'Guides', 'guides', 'Guides et tutoriels', '#059669', '2026-03-03 10:34:44.023', '2026-03-03 10:34:44.023'),
('cmmah10ho0002sbm4g6tlq2l4', 'Partenariats', 'partenariats', 'Nos partenariats', '#D97706', '2026-03-03 10:34:44.029', '2026-03-03 10:34:44.029'),
('cmmah10hu0003sbm44aw8cyis', 'Innovation', 'innovation', 'Innovations technologiques', '#7C3AED', '2026-03-03 10:34:44.034', '2026-03-03 10:34:44.034'),
('cmmah10hx0004sbm4yplios6o', 'Événements', 'evenements', 'Événements et actualités', '#DC2626', '2026-03-03 10:34:44.037', '2026-03-03 10:34:44.037'),
('cmmah10i80006sbm4nn9n2p6i', 'Produit', 'produit', 'Stratégie produit, roadmap et vision.', '#D97706', '2026-03-03 10:34:44.049', '2026-03-03 10:34:44.049'),
('cmmah10ib0007sbm4haqssj5j', 'Design', 'design', 'UI/UX, systèmes de design et esthétique.', '#7C3AED', '2026-03-03 10:34:44.052', '2026-03-03 10:34:44.052'),
('cmmah10if0008sbm4egtlevxi', 'Marketing', 'marketing', 'Croissance, SEO et stratégies de contenu.', '#059669', '2026-03-03 10:34:44.056', '2026-03-03 10:34:44.056');

-- --------------------------------------------------------

--
-- Structure de la table `Distributor`
--

CREATE TABLE `Distributor` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `location` text NOT NULL,
  `phone` varchar(191) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `logo` varchar(191) DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `Distributor`
--

INSERT INTO `Distributor` (`id`, `name`, `location`, `phone`, `order`, `logo`, `address`, `lat`, `lng`) VALUES
('cmmah110d002xsbm4rnh4gu2z', 'SAK-SERVICES', 'Godomey Togoudo - Allegléta - Womey', '01 97 70 73 73', 0, '/uploads/1772717552531-2qltz9phidg.png', 'G85X+2H, Akassato, Benin', 6.50815, 2.347829),
('cmmah110i002ysbm46l4tooge', 'RÈGNE DE L\'ÉTERNEL', 'Porto-Novo', '01 97 33 95 23', 1, '/uploads/1772914525017-7e5qng9juju.jpg', NULL, NULL, NULL),
('cmmah110n002zsbm4c43g6lmt', 'NETSHOP', 'Ikpinlè Tankpè - Parana - Bidossessi - Sos - Ganvié', '01 96 73 92 72 / 01 96 20 92 09', 2, NULL, NULL, NULL, NULL),
('cmmah110q0030sbm4xue6sd7a', 'ALAKHBAAR SERVICE', '1er - 4ième arrondissement', '01 97 97 02 91 / 01 90 56 56 56', 3, NULL, NULL, NULL, NULL),
('cmmah110u0031sbm4jcjqbgim', 'EXPERT COMMUNICATION', 'Aguégué - Adjohoun - Dangbo - Bonou - Akpro Missérété - Adjarra - Avrankou', '01 96 64 92 83', 4, NULL, NULL, NULL, NULL),
('cmmah110x0032sbm4sg9dywtc', 'DON DE DIEU SALEM', 'Glo - Zè - Tori - Allada - Toffo', '01 97 27 67 91', 5, NULL, NULL, NULL, NULL),
('cmmah11110033sbm4ssvkibov', 'KR BUSINESS CENTER', 'Parakou - Tchaourou', '01 97 35 49 46', 6, NULL, NULL, NULL, NULL),
('cmmah11140034sbm4ahlkbum4', 'NOUROU DISTRIBUTION & SERVICES', 'Natitingou', '01 44 71 74 88 / 01 95 77 86 61', 7, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `GabAtm`
--

CREATE TABLE `GabAtm` (
  `id` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `logo` varchar(191) DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `GabAtm`
--

INSERT INTO `GabAtm` (`id`, `city`, `location`, `order`, `logo`, `address`, `lat`, `lng`) VALUES
('cmmah11190035sbm440t2v5q1', 'Cotonou', 'Agence Principale ATM 1 - Carrefour Trois Banques', 0, NULL, NULL, NULL, NULL),
('cmmah111d0036sbm4hb8tq6mm', 'Cotonou', 'cdcd', 1, NULL, '98JX+C7F, Cotonou, Benin', 6.380815, 2.347829),
('cmmah111j0037sbm4rdkkrkww', 'Cotonou', 'Agence Principale ATM 2', 2, NULL, NULL, NULL, NULL),
('cmmah111m0038sbm4t1yk4tg7', 'Cotonou', 'Fidjrossè ATM 2', 3, NULL, NULL, NULL, NULL),
('cmmah111q0039sbm4i5kg0yqd', 'Cotonou', 'Commissariat Central - Bénin Petro', 4, NULL, NULL, NULL, NULL),
('cmmah111t003asbm4xlunt51l', 'Cotonou', 'Patte d\'Oie', 5, NULL, NULL, NULL, NULL),
('cmmah111x003bsbm4nfqxtbxu', 'Cotonou', 'Agence Dantokpa ATM', 6, NULL, NULL, NULL, NULL),
('cmmah1120003csbm476zu3xe1', 'Cotonou', 'Erevan', 7, NULL, NULL, NULL, NULL),
('cmmah1124003dsbm4kr3dypem', 'Cotonou', 'CABI SCBERMAP', 8, NULL, NULL, NULL, NULL),
('cmmah1127003esbm4erycblkw', 'Cotonou', 'Patte d\'Oie ATM', 9, NULL, NULL, NULL, NULL),
('cmmah112a003fsbm4n3pa5gy7', 'Cotonou', 'GAB Jéricho Dantokpa', 10, NULL, NULL, NULL, NULL),
('cmmah112e003gsbm4daldrfxv', 'Cotonou', 'Stade de l\'Amitié', 11, NULL, NULL, NULL, NULL),
('cmmah112h003hsbm41w84kj6l', 'Cotonou', 'Abattoir ATM 1 - Face Imprimerie Toundé', 12, NULL, NULL, NULL, NULL),
('cmmah112l003isbm4470388jk', 'Cotonou', 'Houdegbé ATM 2', 13, NULL, NULL, NULL, NULL),
('cmmah112o003jsbm4bwds2nj2', 'Fidjrosse', 'Fidjrosse Plage', 14, '/uploads/1772709095112-1vf7ix6xldb.png', '982W+8WH, Cotonou, Benin', 6.3509541, 2.3478029),
('cmmah112s003ksbm4bbse5cnq', 'Bohicon', 'Bohicon ATM 1 - Quartier Gankon', 15, NULL, NULL, NULL, NULL),
('cmmah112v003lsbm4xb5g0jft', 'Zogbodomey', 'GAB Nocibe Massi', 16, NULL, NULL, NULL, NULL),
('cmmah112z003msbm4pvtqq15d', 'Ouidah', 'Ouidah ATM', 17, NULL, NULL, NULL, NULL),
('cmmah1132003nsbm4gbs6tqac', 'Comé', 'Comé Branch - Quartier Hongodé', 18, NULL, NULL, NULL, NULL),
('cmmah1136003osbm4xbx4cpcx', 'Porto-Novo', 'Porto-Novo ATM 1 - Face Toffa', 19, NULL, NULL, NULL, NULL),
('cmmah1139003psbm4879mmxlw', 'Parakou', 'Parakou ATM 1 - Banikouara', 20, NULL, NULL, NULL, NULL),
('cmmah113d003qsbm4j634bk2t', 'Parakou', 'Université de Parakou', 21, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `InternationalCountry`
--

CREATE TABLE `InternationalCountry` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `InternationalCountry`
--

INSERT INTO `InternationalCountry` (`id`, `name`, `order`) VALUES
('cmmey04b30000lffi4e4cxxuv', 'États-Unis', 0),
('cmmey04b60001lffie5e5ct0n', 'Europe', 1),
('cmmey04bc0002lffimd16orci', 'Canada', 2),
('cmmey04bg0003lffiu0e650e1', 'Inde', 3),
('cmmey04bi0004lffiprkwl6xt', 'Royaume-Uni', 4),
('cmmey04bm0005lffia64gat0u', 'Émirats Arabes Unis', 5),
('cmmey04bp0006lffi78s53fzy', 'Nigeria', 6),
('cmmey04bs0007lffip1x3ltfq', 'Cameroun', 7),
('cmmf0tl1l0000u7z2o3xd7cn8', 'Espagne', 8),
('cmmf0tzsv0001u7z2tjhu4q6x', 'RDC', 9);

-- --------------------------------------------------------

--
-- Structure de la table `Microfinance`
--

CREATE TABLE `Microfinance` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `agencies` int(11) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `logo` varchar(191) DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `Microfinance`
--

INSERT INTO `Microfinance` (`id`, `name`, `agencies`, `order`, `logo`, `address`, `lat`, `lng`) VALUES
('cmmah10zo002qsbm4p4387dyk', 'AFRICA FINANCES', 13, 0, '/uploads/1772697632968-jf7hdxokp3m.png', '982W+8WH, Cotonou, Benin', 6.350815, 2.347829),
('cmmah10zr002rsbm4zq3r1klp', 'COWEC', 13, 1, '/uploads/1772717530742-u44vfwb40k.png', '982X+84 Sohoué, Benin', 7.350815, 2.347829),
('cmmah10zw002ssbm4a6259xfv', 'COMUBA', 28, 2, NULL, NULL, NULL, NULL),
('cmmah10zy002tsbm47ba21fgj', 'MDB', 4, 3, NULL, '982W+8WH, Cotonou, Benin', 6.3509, 2.3478),
('cmmah1101002usbm41jtp9d74', 'SIAN\'SON', 3000000, 4, NULL, NULL, NULL, NULL),
('cmmah1104002vsbm48kwhkire', 'RENACA', 39, 5, NULL, NULL, NULL, NULL),
('cmmah1106002wsbm4n8pe5f90', 'LE DEFIS', 14, 6, NULL, NULL, NULL, NULL),
('cmmarcfo70000bc1gm0ouq933', 'NARUTO', 2000000000, 7, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `Partner`
--

CREATE TABLE `Partner` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `logo` varchar(191) DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `Partner`
--

INSERT INTO `Partner` (`id`, `name`, `category`, `description`, `order`, `logo`, `address`, `lat`, `lng`) VALUES
('cmmah113g003rsbm4gc0bqad3', 'UBA', 'Banque', 'Africa\'s Global Bank - Partenaire bancaire principal', 0, '/uploads/1772697719620-qdpqv9ozhx.png', NULL, NULL, NULL),
('cmmah113l003ssbm4iaydfa8b', 'BCEAO', 'Régulateur', 'Banque Centrale des États de l\'Afrique de l\'Ouest', 1, NULL, NULL, NULL, NULL),
('cmmah113q003tsbm4cz6o49ls', 'TERRA PAY', 'Transfert', 'Partenaire transfert international', 2, NULL, NULL, NULL, NULL),
('cmmah113u003usbm4e5i2ub0j', 'AGL', 'Logistique', 'Africa Global Logistics', 3, NULL, NULL, NULL, NULL),
('cmmah113w003vsbm4rsirrt7u', 'CANAL+', 'Médias', 'Partenaire réabonnement TV', 4, NULL, NULL, NULL, NULL),
('cmmah1140003wsbm4pft7sqb7', 'SBEE', 'Énergie', 'Société Béninoise d\'Énergie Électrique', 5, '/uploads/1772697729422-h316d335mzf.png', NULL, NULL, NULL),
('cmmah1144003xsbm40rfoygdu', 'CMA CGM', 'Maritime', 'Partenaire paiement transitaires', 6, NULL, NULL, NULL, NULL),
('cmmah1147003ysbm4b5ghd9no', 'UNICEF', 'Institution', 'Fonds des Nations Unies pour l\'enfance', 7, NULL, NULL, NULL, NULL),
('cmmah1149003zsbm413x5vy62', 'MFS', 'Fintech', 'Mobile Financial Services', 8, NULL, NULL, NULL, NULL),
('cmmah114c0040sbm4tpu80tfa', 'ONAFRIQ', 'Fintech', 'Réseau de paiement africain', 9, NULL, NULL, NULL, NULL),
('cmmah114f0041sbm4439wx64c', 'APSFD', 'Association', 'Association Professionnelle des Systèmes Financiers Décentralisés', 10, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `Service`
--

CREATE TABLE `Service` (
  `id` varchar(191) NOT NULL,
  `serviceId` varchar(191) NOT NULL,
  `type` enum('particulier','business') NOT NULL,
  `title` varchar(191) NOT NULL,
  `icon` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `ussdSteps` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`ussdSteps`)),
  `appSteps` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`appSteps`)),
  `characteristics` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`characteristics`)),
  `advantages` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`advantages`)),
  `useCases` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`useCases`)),
  `steps` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`steps`)),
  `linkingMethods` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`linkingMethods`)),
  `model` varchar(191) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `Service`
--

INSERT INTO `Service` (`id`, `serviceId`, `type`, `title`, `icon`, `description`, `features`, `ussdSteps`, `appSteps`, `characteristics`, `advantages`, `useCases`, `steps`, `linkingMethods`, `model`, `order`) VALUES
('cmmah10xs0012sbm4kz5ja9yj', 'transfers', 'particulier', 'Transferts', 'ArrowLeftRight', 'Envoyez de l\'argent vers tous les portefeuilles Mobile Money et comptes B-MO', '[\"Vers MTN MoMo\",\"Vers Moov Money\",\"Vers Celtiis Cash\",\"Vers compte B-MO\",\"Transfert planifié\",\"Transfert planifiéFFF\"]', '[\"Tapez *890#\",\"Sélectionnez 1 - Client\",\"Choisissez Transferts\",\"Sélectionnez le type de transfert\",\"Entrez le numéro du bénéficiaire\",\"Saisissez le montant\",\"Validez avec votre code PIN\"]', '[\"Connectez-vous à l\'application B-MO\",\"Cliquez sur Transferts\",\"Choisissez Wallet Mobile puis National\",\"Saisissez le numéro du bénéficiaire\",\"Entrez le montant, nom et prénom du bénéficiaire\",\"Choisissez la raison du transfert\",\"Validez avec votre code PIN\"]', NULL, NULL, NULL, NULL, NULL, NULL, 0),
('cmmah10xw0013sbm45zg8s3x4', 'bills', 'particulier', 'Paiement Factures', 'Receipt', 'Payez vos factures SBEE et réabonnements Canal+ en toute simplicité', '[\"Facture SBEE Prépayée\",\"Facture SBEE Postpayée\",\"Réabonnement Canal+\"]', '[\"Composez *890#\",\"Sélectionnez 1 - Client\",\"Rendez-vous dans le menu 7 - Facture\",\"Sélectionnez: 1 - Prépayé SBEE ou 2 - Postpayé SBEE\",\"Renseignez les informations du compteur\",\"Entrez votre mot de passe pour valider\"]', '[\"Connectez-vous à l\'application B-MO\",\"Cliquez sur Factures SBEE\",\"Saisissez le numéro de compteur et le montant\",\"Faites le récapitulatif et confirmez\",\"Entrez votre code PIN pour valider\"]', NULL, NULL, NULL, NULL, NULL, NULL, 1),
('cmmah10y20014sbm4ak45k53w', 'airtime', 'particulier', 'Crédits & Forfaits', 'Wifi', 'Achetez du crédit de communication et des forfaits internet sur tous les réseaux', '[\"Crédit d\'appel MTN/Moov/Celtiis\",\"Forfait Internet\",\"Forfait Mixte\",\"Achat pour soi-même ou pour un tiers\"]', '[\"Composez *890#\",\"Sélectionnez 1 - Client\",\"Choisissez 5 - Crédit/Forfait\",\"Sélectionnez le type (Crédit, Forfait, Mixte)\",\"Choisissez Pour moi-même ou Pour un tiers\",\"Sélectionnez l\'offre souhaitée\",\"Saisissez votre mot de passe pour valider\"]', '[\"Connectez-vous à l\'application B-MO\",\"Cliquez sur Crédits et Forfaits\",\"Choisissez le type (Crédit d\'appel, Forfait internet, Mixte)\",\"Sélectionnez le bénéficiaire\",\"Choisissez l\'offre et validez avec votre code PIN\"]', NULL, NULL, NULL, NULL, NULL, NULL, 2),
('cmmah10y50015sbm4anq9jq0q', 'withdrawal', 'particulier', 'Retrait GAB UBA', 'Banknote', 'Retirez de l\'argent aux guichets automatiques UBA partout au Bénin', '[\"Retrait sans carte bancaire\",\"Code ATM à 6 chiffres\",\"30+ GAB disponibles\"]', '[\"Tapez *890#\",\"Choisissez 1 - Client\",\"Sélectionnez 8 - Retrait GAB\",\"Mettez le montant et un code à 4 chiffres de votre choix\",\"Cliquez sur Générer puis entrez votre code PIN\",\"Recevez par SMS le code ATM à 6 chiffres\",\"Allez au guichet, choisissez Retrait Mobile Money\",\"Entrez le code ATM et le montant, validez\"]', '[\"Connectez-vous à l\'application B-MO\",\"Cliquez sur Transfert\",\"Sélectionnez Retrait ATM\",\"Entrez le montant souhaité\",\"Générez le code ATM\",\"Présentez-vous au GAB UBA avec le code reçu\"]', NULL, NULL, NULL, NULL, NULL, NULL, 3),
('cmmah10y80016sbm4oum4fhvx', 'pushpull', 'particulier', 'Push & Pull Bancaire', 'ArrowUpDown', 'Transférez des fonds entre votre compte B-MO et votre compte UBA ou carte prépayée', '[\"Virement de UBA vers B-MO (Pull)\",\"Virement de B-MO vers UBA (Push)\",\"Liaison compte bancaire\",\"Liaison carte prépayée\"]', NULL, NULL, NULL, NULL, NULL, NULL, '{\"automatic\":{\"title\":\"Liaison Automatique\",\"description\":\"Pour les utilisateurs ayant le même numéro B-MO que celui associé au compte UBA\",\"steps\":[\"Connectez-vous à l\'application B-MO\",\"Cliquez sur Transferts\",\"Cliquez sur Push & Pull\",\"Cliquez sur Liaison de compte bancaire et carte prépayée\",\"Cochez Compte bancaire ou Carte prépayée\",\"Renseignez votre numéro de compte ou identifiant client\",\"Entrez les 4 derniers chiffres de votre carte prépayée\"]},\"manual\":{\"title\":\"Liaison Manuelle\",\"description\":\"En agence, pour les utilisateurs avec un numéro B-MO différent\",\"steps\":[\"Rendez-vous dans une agence UBA\",\"Munissez-vous d\'une pièce d\'identité valide\",\"Remplissez le formulaire de souscription auprès du CSO\"]}}', NULL, 4),
('cmmah10yc0017sbm48eagfpvq', 'international', 'particulier', 'Transfert International', 'Globe', 'Recevez des fonds depuis Western Union, MoneyGram et autres services internationaux', '[\"Réception Western Union\",\"Réception MoneyGram\",\"Zone UEMOA\",\"Zone CEMAC\",\"International (USA, Europe, Canada, Inde, UK, Émirats, Nigeria, Cameroun)\"]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5),
('cmmah10yf0018sbm4c1ueqhdk', 'mass-payment', 'business', 'Paiement de Masse', 'Users', 'Transférez directement les fonds vers les comptes B-MO de vos bénéficiaires', NULL, NULL, NULL, '[\"Paiement instantané en temps réel\",\"Accessible via application et USSD (*890#)\",\"Sécurisé et traçable\",\"Flexibilité d\'utilisation (paiements, retraits, transferts)\"]', '[\"Paiement instantané et accessible partout\",\"Solution digitale sans manipulation d\'espèces\",\"Traçabilité complète et meilleure gestion comptable\",\"Adapté aux travailleurs, étudiants, retraités et prestataires\",\"Automatisation réduisant les charges administratives\",\"Gain de temps et réduction des coûts\"]', '[\"Salaires des employés\",\"Bourses étudiantes\",\"Pensions retraités\",\"Paiement des prestataires\"]', NULL, NULL, NULL, 0),
('cmmah10yj0019sbm40dc8edjh', 'collection', 'business', 'Collecte B-MO Pay', 'Wallet', 'Solution sécurisée pour collecter les paiements de vos clients et membres', NULL, NULL, NULL, '[\"Technologie avancée et sécurisée\",\"Collecte fluide et transparente\",\"Rapidité dans le traitement des transactions\"]', NULL, NULL, '[\"Connectez-vous à votre compte partenaire B-MO\",\"Cliquez sur B-MO Pay\",\"Saisissez le numéro collect\",\"Entrez l\'agence collect\",\"Entrez le nom du déposant\",\"Sélectionnez le motif\",\"Sélectionnez le type de pièces\",\"Entrez le numéro de la pièce et sa date d\'expiration\",\"Cliquez sur ajouter un produit\",\"Entrez le(s) produit et le(s) montant puis validez\"]', NULL, NULL, 1),
('cmmah10ym001asbm4nfxzxtl3', 'tpe', 'business', 'TPE B-MO', 'CreditCard', 'Terminaux de paiement électronique pour les marchands B-MO', '[\"Services à valeur ajoutée\",\"Collecte des paiements\",\"Commissions sur transactions\",\"Compatible avec tous les terminaux acceptant les cartes bancaires\"]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'FEITIAN F20', 2),
('cmmah10yp001bsbm4e5thr8pz', 'university', 'business', 'Inscription Universitaire', 'GraduationCap', 'Paiement sécurisé des droits d\'inscription universitaire', '[\"Paiement sécurisé\",\"Expérience fluide\",\"Sans tracas pour les étudiants\"]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('cmmah10ys001csbm40lu7kad0', 'cmacgm', 'business', 'Paiement CMACGM', 'Ship', 'Solution pour les transitaires pour payer leurs factures dans la caisse CMACGM', '[\"Paiement simplifié\",\"Sécurisé\",\"Intégration caisse CMACGM\"]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4),
('cmmah10yv001dsbm4srfkr77z', 'scheduled', 'business', 'Transfert Planifié', 'Calendar', 'Automatisez vos paiements réguliers et à échéances spécifiques', NULL, NULL, NULL, NULL, NULL, '[\"Loyer mensuel\",\"Abonnements\",\"Frais de scolarité\",\"Paiements récurrents\"]', NULL, NULL, NULL, 5);

-- --------------------------------------------------------

--
-- Structure de la table `TariffMeta`
--

CREATE TABLE `TariffMeta` (
  `id` varchar(191) NOT NULL,
  `region` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `TariffMeta`
--

INSERT INTO `TariffMeta` (`id`, `region`, `title`, `description`, `note`) VALUES
('cmmah10z1001esbm4ef7p39yf', 'uemoa', 'Grille Tarifaire UEMOA', 'Frais pour les transferts et retraits dans la zone UEMOA', NULL),
('cmmah10z7001ssbm4fa3g67y7', 'senegal', 'Grille Tarifaire Sénégal', 'Frais pour les envois vers le Sénégal', NULL),
('cmmah10zd0025sbm4s149m055', 'cemac', 'Grille Tarifaire CEMAC', 'Frais pour les envois vers la zone CEMAC', NULL),
('cmmah10zi002hsbm4403mowfq', 'mobile', 'Transfert Mobile Money', 'Frais pour les transferts entre B-MO et les autres réseaux Mobile Money', NULL),
('cmmah10zm002psbm4a1mxt0gv', 'international', 'Transferts Internationaux', 'Destinations: États-Unis, Europe, Canada, Inde, Royaume-Uni, Émirats Arabes Unis, Nigeria, Cameroun', 'Contactez-nous pour les tarifs spécifiques par destination');

-- --------------------------------------------------------

--
-- Structure de la table `TariffRow`
--

CREATE TABLE `TariffRow` (
  `id` varchar(191) NOT NULL,
  `min` double NOT NULL,
  `max` double DEFAULT NULL,
  `fraisRetrait` double DEFAULT NULL,
  `fraisEnvoi` double DEFAULT NULL,
  `minEnvoi` double DEFAULT NULL,
  `maxEnvoi` double DEFAULT NULL,
  `frais` double DEFAULT NULL,
  `fraisBmoVersAutres` double DEFAULT NULL,
  `fraisAutresVersBmo` varchar(191) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `tariffMetaId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `TariffRow`
--

INSERT INTO `TariffRow` (`id`, `min`, `max`, `fraisRetrait`, `fraisEnvoi`, `minEnvoi`, `maxEnvoi`, `frais`, `fraisBmoVersAutres`, `fraisAutresVersBmo`, `order`, `tariffMetaId`) VALUES
('cmmah10z1001fsbm4w9w4eju3', 1, 1000, 40, 150, 1, 5000, NULL, NULL, NULL, 0, 'cmmah10z1001esbm4ef7p39yf'),
('cmmah10z1001gsbm4x0k795x6', 501, 5000, 95, 350, 5001, 20000, NULL, NULL, NULL, 1, 'cmmah10z1001esbm4ef7p39yf'),
('cmmah10z1001hsbm4e723q6mm', 5001, 10000, 170, 750, 20001, 50000, NULL, NULL, NULL, 2, 'cmmah10z1001esbm4ef7p39yf'),
('cmmah10z1001isbm471r4cpr5', 10001, 20000, 325, 1000, 50001, 75000, NULL, NULL, NULL, 3, 'cmmah10z1001esbm4ef7p39yf'),
('cmmah10z1001jsbm47pcivvt4', 20001, 50000, 650, 1300, 75001, 100000, NULL, NULL, NULL, 4, 'cmmah10z1001esbm4ef7p39yf'),
('cmmah10z2001ksbm4hhd1ostq', 50001, 100000, 950, 1800, 100001, 200000, NULL, NULL, NULL, 5, 'cmmah10z1001esbm4ef7p39yf'),
('cmmah10z2001lsbm4ggwjozeb', 100001, 200000, 1900, 2800, 200001, 300000, NULL, NULL, NULL, 6, 'cmmah10z1001esbm4ef7p39yf'),
('cmmah10z2001msbm43cu5ehib', 200001, 300000, 2800, 3500, 300001, 400000, NULL, NULL, NULL, 7, 'cmmah10z1001esbm4ef7p39yf'),
('cmmah10z2001nsbm4ntfnhev4', 300001, 500000, 3250, 4000, 400001, 500000, NULL, NULL, NULL, 8, 'cmmah10z1001esbm4ef7p39yf'),
('cmmah10z2001osbm4003k812m', 500001, 750000, 4500, 5800, 500001, 750000, NULL, NULL, NULL, 9, 'cmmah10z1001esbm4ef7p39yf'),
('cmmah10z2001psbm4hmomurlz', 750001, 1000000, 5500, 10000, 750001, 1500000, NULL, NULL, NULL, 10, 'cmmah10z1001esbm4ef7p39yf'),
('cmmah10z2001qsbm47wt7xgtc', 1000001, 1500000, 7500, 13000, 1500001, 2000000, NULL, NULL, NULL, 11, 'cmmah10z1001esbm4ef7p39yf'),
('cmmah10z2001rsbm43li8mpul', 1500001, 2000000, 8000, NULL, NULL, NULL, NULL, NULL, NULL, 12, 'cmmah10z1001esbm4ef7p39yf'),
('cmmah10z7001tsbm4dl74445i', 1, 5000, NULL, 1200, 1, 20000, 200, NULL, NULL, 0, 'cmmah10z7001ssbm4fa3g67y7'),
('cmmah10z7001usbm4uj8z3upr', 5001, 20000, NULL, NULL, NULL, NULL, 300, NULL, NULL, 1, 'cmmah10z7001ssbm4fa3g67y7'),
('cmmah10z7001vsbm43wk9sytr', 20001, 50000, NULL, 1500, 20001, 50000, 750, NULL, NULL, 2, 'cmmah10z7001ssbm4fa3g67y7'),
('cmmah10z7001wsbm4s9jxpjuu', 50001, 75000, NULL, 2000, 50001, 100000, 1125, NULL, NULL, 3, 'cmmah10z7001ssbm4fa3g67y7'),
('cmmah10z7001xsbm4lqsan8kl', 75001, 100000, NULL, 2500, 100001, 200000, 1500, NULL, NULL, 4, 'cmmah10z7001ssbm4fa3g67y7'),
('cmmah10z7001ysbm425giyrhj', 100001, 200000, NULL, 5000, 200001, 500000, 3000, NULL, NULL, 5, 'cmmah10z7001ssbm4fa3g67y7'),
('cmmah10z7001zsbm4otxw17a7', 200001, 300000, NULL, 6000, 500001, 750000, 4000, NULL, NULL, 6, 'cmmah10z7001ssbm4fa3g67y7'),
('cmmah10z70020sbm46f8dl05r', 300001, 400000, NULL, NULL, NULL, NULL, 6500, NULL, NULL, 7, 'cmmah10z7001ssbm4fa3g67y7'),
('cmmah10z70021sbm4biyfbzkx', 400001, 500000, NULL, 7500, 750001, 1000000, 7500, NULL, NULL, 8, 'cmmah10z7001ssbm4fa3g67y7'),
('cmmah10z70022sbm4a964dqpo', 500001, 750000, NULL, 8500, 1000001, 1500000, 11250, NULL, NULL, 9, 'cmmah10z7001ssbm4fa3g67y7'),
('cmmah10z70023sbm4xuscfpcz', 750001, 1500000, NULL, NULL, NULL, NULL, 22500, NULL, NULL, 10, 'cmmah10z7001ssbm4fa3g67y7'),
('cmmah10z70024sbm465ke7x67', 1500001, 2000000, NULL, 10000, 1500001, 2000000, 30000, NULL, NULL, 11, 'cmmah10z7001ssbm4fa3g67y7'),
('cmmah10zd0026sbm4d16wuwge', 1, 20000, NULL, 1200, NULL, NULL, NULL, NULL, NULL, 0, 'cmmah10zd0025sbm4s149m055'),
('cmmah10zd0027sbm45o9kfuwx', 20001, 50000, NULL, 2000, NULL, NULL, NULL, NULL, NULL, 1, 'cmmah10zd0025sbm4s149m055'),
('cmmah10zd0028sbm48ggrgd3n', 50001, 100000, NULL, 2500, NULL, NULL, NULL, NULL, NULL, 2, 'cmmah10zd0025sbm4s149m055'),
('cmmah10zd0029sbm45v23w22y', 100001, 200000, NULL, 3500, NULL, NULL, NULL, NULL, NULL, 3, 'cmmah10zd0025sbm4s149m055'),
('cmmah10zd002asbm4p5wtt50v', 200001, 300000, NULL, 4000, NULL, NULL, NULL, NULL, NULL, 4, 'cmmah10zd0025sbm4s149m055'),
('cmmah10zd002bsbm40qpt3zqv', 300001, 400000, NULL, 4500, NULL, NULL, NULL, NULL, NULL, 5, 'cmmah10zd0025sbm4s149m055'),
('cmmah10zd002csbm4rsaoeync', 400001, 500000, NULL, 5000, NULL, NULL, NULL, NULL, NULL, 6, 'cmmah10zd0025sbm4s149m055'),
('cmmah10zd002dsbm4o41nydc0', 500001, 750000, NULL, 6500, NULL, NULL, NULL, NULL, NULL, 7, 'cmmah10zd0025sbm4s149m055'),
('cmmah10zd002esbm4qq91o7l7', 750001, 1000000, NULL, 7500, NULL, NULL, NULL, NULL, NULL, 8, 'cmmah10zd0025sbm4s149m055'),
('cmmah10zd002fsbm4o4qncwre', 1000001, 1500000, NULL, 8500, NULL, NULL, NULL, NULL, NULL, 9, 'cmmah10zd0025sbm4s149m055'),
('cmmah10zd002gsbm4qv0tgf82', 1500001, 2000000, NULL, 10000, NULL, NULL, NULL, NULL, NULL, 10, 'cmmah10zd0025sbm4s149m055'),
('cmmah10zi002isbm4e2g5kq8f', 1, 2000, NULL, NULL, NULL, NULL, NULL, 200, NULL, 0, 'cmmah10zi002hsbm4403mowfq'),
('cmmah10zi002jsbm40vapneru', 2001, 5000, NULL, NULL, NULL, NULL, NULL, 225, NULL, 1, 'cmmah10zi002hsbm4403mowfq'),
('cmmah10zi002ksbm43ze16gc5', 5001, 40000, NULL, NULL, NULL, NULL, NULL, 300, '0,2%', 2, 'cmmah10zi002hsbm4403mowfq'),
('cmmah10zi002lsbm4p8e2l1qt', 40001, 75000, NULL, NULL, NULL, NULL, NULL, 350, NULL, 3, 'cmmah10zi002hsbm4403mowfq'),
('cmmah10zi002msbm4m8ke8tk2', 75001, 400000, NULL, NULL, NULL, NULL, NULL, 400, NULL, 4, 'cmmah10zi002hsbm4403mowfq'),
('cmmah10zi002nsbm4o8zxjxid', 400001, 1000000, NULL, NULL, NULL, NULL, NULL, 450, NULL, 5, 'cmmah10zi002hsbm4403mowfq'),
('cmmah10zi002osbm419tuh9au', 1000001, 2000000, NULL, NULL, NULL, NULL, NULL, 500, NULL, 6, 'cmmah10zi002hsbm4403mowfq');

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `User`
--

INSERT INTO `User` (`id`, `email`, `password`, `name`, `createdAt`, `updatedAt`) VALUES
('cmmah10w70009sbm4wqgzllr9', 'admin@bmo.com', '$2b$12$pygyKTKe8i.BStJnzsuxyO8e0.n68fm.avK6LbbD/fSpNG4LS79de', 'Admin B-MO', '2026-03-03 10:34:44.552', '2026-03-03 10:34:44.552');

-- --------------------------------------------------------

--
-- Structure de la table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Article`
--
ALTER TABLE `Article`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Article_slug_key` (`slug`),
  ADD KEY `Article_categoryId_fkey` (`categoryId`),
  ADD KEY `Article_userId_fkey` (`userId`);

--
-- Index pour la table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Category_name_key` (`name`),
  ADD UNIQUE KEY `Category_slug_key` (`slug`);

--
-- Index pour la table `Distributor`
--
ALTER TABLE `Distributor`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `GabAtm`
--
ALTER TABLE `GabAtm`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `InternationalCountry`
--
ALTER TABLE `InternationalCountry`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Microfinance`
--
ALTER TABLE `Microfinance`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Microfinance_name_key` (`name`);

--
-- Index pour la table `Partner`
--
ALTER TABLE `Partner`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Partner_name_key` (`name`);

--
-- Index pour la table `Service`
--
ALTER TABLE `Service`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Service_serviceId_key` (`serviceId`);

--
-- Index pour la table `TariffMeta`
--
ALTER TABLE `TariffMeta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `TariffMeta_region_key` (`region`);

--
-- Index pour la table `TariffRow`
--
ALTER TABLE `TariffRow`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TariffRow_tariffMetaId_fkey` (`tariffMetaId`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Index pour la table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Article`
--
ALTER TABLE `Article`
  ADD CONSTRAINT `Article_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Article_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `TariffRow`
--
ALTER TABLE `TariffRow`
  ADD CONSTRAINT `TariffRow_tariffMetaId_fkey` FOREIGN KEY (`tariffMetaId`) REFERENCES `TariffMeta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
