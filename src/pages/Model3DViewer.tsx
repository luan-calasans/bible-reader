import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Info, Share2, BookOpen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Model3D {
  id: string;
  title: string;
  description: string;
  category: string;
  sketchfabUrl: string;
  embedUrl: string;
  author: string;
  tags: string[];
  biblicalReference: string;
  detailedDescription?: string;
}

const models3D: Model3D[] = [
  {
    id: 'tabernacle',
    title: 'Tabernáculo',
    description:
      'O Tabernáculo era uma tenda portátil que servia como local de adoração para os israelitas durante sua jornada pelo deserto. Era o centro da vida religiosa e espiritual do povo de Deus.',
    category: 'Construções Sagradas',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/tabernacle-57e4cd4ad59a45c78c8e1b81c7c23d9b',
    embedUrl:
      'https://sketchfab.com/models/57e4cd4ad59a45c78c8e1b81c7c23d9b/embed',
    author: 'bibel-in-3d.de',
    tags: ['Tabernáculo', 'Êxodo', 'Construção Sagrada'],
    biblicalReference: 'Êxodo 25-40',
    detailedDescription:
      'O Tabernáculo, também conhecido como "Tenda da Congregação", era uma estrutura portátil que acompanhava os israelitas durante seus 40 anos de peregrinação pelo deserto. Construído com materiais preciosos como ouro, prata, bronze, linho fino e peles de animais, o Tabernáculo representava a presença de Deus entre seu povo. Sua estrutura incluía o Pátio Exterior com o Altar de Holocaustos e a Pia de Bronze, o Lugar Santo com a Mesa dos Pães da Proposição, o Candelabro de Ouro e o Altar do Incenso, e o Lugar Santíssimo (Santo dos Santos) onde ficava a Arca da Aliança. Esta construção sagrada serviu como protótipo para o Templo de Salomão e simbolizava a futura habitação de Deus entre os homens através de Jesus Cristo.',
  },
  {
    id: 'solomons-temple',
    title: 'Templo de Salomão',
    description:
      'O Templo de Salomão foi o primeiro templo permanente construído em Jerusalém. Era uma estrutura magnífica que servia como centro de adoração e símbolo da presença de Deus entre seu povo.',
    category: 'Construções Sagradas',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/solomons-temple-ca7304c57de84d0b85148a245de08452',
    embedUrl:
      'https://sketchfab.com/models/ca7304c57de84d0b85148a245de08452/embed',
    author: 'bibel-in-3d.de',
    tags: ['Templo', 'Salomão', 'Jerusalém'],
    biblicalReference: '1 Reis 6-8',
    detailedDescription:
      'O Templo de Salomão, construído no século X a.C., foi uma das estruturas mais impressionantes da antiguidade. Localizado no Monte Moriá em Jerusalém, o templo foi construído com pedras de calcário branco, cedro do Líbano e ouro puro. Sua arquitetura seguia o padrão do Tabernáculo, mas em escala monumental. O templo incluía o Pórtico de Entrada, o Lugar Santo com a Mesa dos Pães da Proposição, o Candelabro de Ouro e o Altar do Incenso, e o Lugar Santíssimo onde ficava a Arca da Aliança. O templo era decorado com querubins esculpidos, palmeiras e flores, e suas paredes eram revestidas de ouro. Esta magnífica estrutura serviu como centro espiritual de Israel por mais de 400 anos, até ser destruída pelos babilônios em 586 a.C.',
  },
  {
    id: 'jesus-resurrection',
    title: 'Ressurreição de Jesus',
    description:
      'A ressurreição de Jesus Cristo é o evento central da fé cristã. Este modelo 3D representa o momento glorioso quando Jesus ressuscitou dos mortos, cumprindo as profecias e demonstrando seu poder sobre a morte.',
    category: 'Eventos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/jesus-resurrection-319fbee72f7a44458d6258b4a5c0b60f',
    embedUrl:
      'https://sketchfab.com/models/319fbee72f7a44458d6258b4a5c0b60f/embed',
    author: 'bibel-in-3d.de',
    tags: ['Jesus', 'Ressurreição', 'Páscoa'],
    biblicalReference: 'Mateus 28, Marcos 16, Lucas 24, João 20',
    detailedDescription:
      'A ressurreição de Jesus Cristo é o evento mais significativo da história cristã. Após sua crucificação e morte na sexta-feira, Jesus foi sepultado em um túmulo novo pertencente a José de Arimateia. No domingo de manhã, o terceiro dia, Maria Madalena e outras mulheres foram ao túmulo para ungir o corpo de Jesus, mas encontraram a pedra removida e o túmulo vazio. Um anjo apareceu e anunciou: "Ele não está aqui; ressuscitou!" Jesus apareceu primeiro a Maria Madalena, depois aos discípulos no caminho de Emaús, e finalmente aos onze apóstolos reunidos. A ressurreição confirma que Jesus é o Filho de Deus, cumpre as profecias do Antigo Testamento, e garante a vitória sobre o pecado e a morte. Este evento é a base da esperança cristã na vida eterna.',
  },
  {
    id: 'tower-babel',
    title: 'Torre de Babel',
    description:
      'A Torre de Babel representa a tentativa humana de alcançar o céu e desafiar a autoridade de Deus. Este evento resultou na confusão das línguas e na dispersão da humanidade.',
    category: 'Eventos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/the-tower-of-babel-96a1c909f3fa45938efda58f6496aa62',
    embedUrl:
      'https://sketchfab.com/models/96a1c909f3fa45938efda58f6496aa62/embed',
    author: 'bibel-in-3d.de',
    tags: ['Babel', 'Torre', 'Confusão de Línguas'],
    biblicalReference: 'Gênesis 11:1-9',
    detailedDescription:
      'A Torre de Babel representa um dos eventos mais significativos da história bíblica. Após o dilúvio, toda a humanidade falava uma única língua e se estabeleceu na planície de Sinear (Babilônia). Em vez de obedecer ao mandamento de Deus para se espalhar e povoar a terra, os homens decidiram construir uma cidade e uma torre que chegasse até o céu. Esta construção, feita de tijolos cozidos e betume, simbolizava a arrogância humana e a tentativa de alcançar o céu por seus próprios esforços. Deus, vendo a rebelião do coração humano, confundiu as línguas dos construtores, fazendo com que não pudessem mais se comunicar. Como resultado, a construção foi interrompida e as pessoas se dispersaram pela terra, formando as diferentes nações e línguas que conhecemos hoje. Este evento explica a origem da diversidade linguística e cultural da humanidade.',
  },
  {
    id: 'golden-calf',
    title: 'Bezerro de Ouro',
    description:
      'O Bezerro de Ouro foi um ídolo criado pelos israelitas enquanto Moisés estava no Monte Sinai recebendo os Dez Mandamentos. Representa a idolatria e a infidelidade do povo.',
    category: 'Objetos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/das-goldene-stierbild-39764b824f294a85bb3a9529a43ac426',
    embedUrl:
      'https://sketchfab.com/models/39764b824f294a85bb3a9529a43ac426/embed',
    author: 'bibel-in-3d.de',
    tags: ['Ídolo', 'Ouro', 'Idolatria'],
    biblicalReference: 'Êxodo 32',
    detailedDescription:
      'O incidente do Bezerro de Ouro é uma das histórias mais trágicas do Antigo Testamento. Enquanto Moisés estava no Monte Sinai recebendo os Dez Mandamentos de Deus, o povo de Israel, impaciente com a demora, pressionou Arão para criar um deus visível que pudessem adorar. Arão coletou ouro das mulheres e crianças e fundiu um bezerro de ouro. O povo então declarou: "Este é o teu deus, ó Israel, que te tirou da terra do Egito!" e começou a oferecer sacrifícios e festejar diante do ídolo. Quando Moisés desceu do monte e viu a idolatria e a festa desenfreada, quebrou as tábuas dos mandamentos em sua ira. Deus ameaçou destruir o povo, mas Moisés intercedeu. Como consequência, três mil homens foram mortos pelos levitas, e o povo foi punido por sua infidelidade. Este evento serve como um aviso sobre os perigos da idolatria e da impaciência na fé.',
  },
  {
    id: 'eden',
    title: 'Jardim do Éden',
    description:
      'O Jardim do Éden era o paraíso original criado por Deus para Adão e Eva. Era um lugar de perfeição e comunhão com Deus, até que o pecado entrou no mundo através da desobediência.',
    category: 'Lugares Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/der-sundenfall-be7d11265528467b8a4d6bbe02d5e90d',
    embedUrl:
      'https://sketchfab.com/models/be7d11265528467b8a4d6bbe02d5e90d/embed',
    author: 'bibel-in-3d.de',
    tags: ['Éden', 'Paraíso', 'Adão e Eva'],
    biblicalReference: 'Gênesis 2-3',
    detailedDescription:
      'O Jardim do Éden era o paraíso original criado por Deus como habitação perfeita para o primeiro casal humano. Localizado "no oriente", o Éden era um lugar de beleza incomparável, com árvores frutíferas, rios cristalinos e uma harmonia perfeita entre todas as criaturas. No centro do jardim estavam a Árvore da Vida e a Árvore do Conhecimento do Bem e do Mal. Deus deu a Adão e Eva domínio sobre toda a criação e apenas uma proibição: não comer do fruto da Árvore do Conhecimento. No entanto, a serpente (Satanás) enganou Eva, fazendo-a duvidar da bondade de Deus e desobedecer ao seu comando. Adão também comeu do fruto proibido, resultando na queda da humanidade. Como consequência, foram expulsos do Éden, o pecado entrou no mundo, e a morte se tornou uma realidade. O Éden representa o estado original de perfeição que será restaurado no novo céu e nova terra prometidos por Deus.',
  },
  {
    id: 'bronze-serpent',
    title: 'Serpente de Bronze',
    description:
      'A Serpente de Bronze foi criada por Moisés por ordem de Deus para curar os israelitas que foram picados por serpentes venenosas. Aqueles que olhavam para ela eram curados.',
    category: 'Objetos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/eherne-schlange-144856674c284a06bd571625aea9267b',
    embedUrl:
      'https://sketchfab.com/models/144856674c284a06bd571625aea9267b/embed',
    author: 'bibel-in-3d.de',
    tags: ['Serpente', 'Cura', 'Moisés'],
    biblicalReference: 'Números 21:4-9',
    detailedDescription:
      'A Serpente de Bronze é um dos símbolos mais poderosos do Antigo Testamento, prefigurando a obra redentora de Cristo. Durante a jornada dos israelitas pelo deserto, o povo se tornou impaciente e começou a reclamar contra Deus e Moisés. Como consequência, Deus enviou serpentes venenosas que picaram muitos israelitas, causando morte. O povo se arrependeu e pediu a Moisés que intercedesse. Deus ordenou a Moisés que fizesse uma serpente de bronze e a colocasse em uma haste. Qualquer pessoa que fosse picada por uma serpente venenosa e olhasse para a serpente de bronze seria curada. Este evento demonstra o princípio da fé - os israelitas tinham que confiar na palavra de Deus e olhar para o símbolo da cura. Jesus referenciou este evento em João 3:14-15, explicando que assim como a serpente foi levantada no deserto, Ele seria levantado na cruz para que todos os que nele cressem tivessem vida eterna.',
  },
  {
    id: 'baptist-church',
    title: 'Igreja Batista Contemporânea',
    description:
      'Uma representação moderna de uma igreja batista, mostrando a arquitetura contemporânea de locais de adoração cristã. Este modelo demonstra como as igrejas evoluíram ao longo do tempo.',
    category: 'Construções Sagradas',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/gospel-baptist-church-579664662ca54efa8bfb2ba7856fe867',
    embedUrl:
      'https://sketchfab.com/models/579664662ca54efa8bfb2ba7856fe867/embed',
    author: "𝐁𝐈𝐆 𝐅𝐀𝐍 𝟑𝐃 '𝟗𝟐 ＮＩＣＥ ＭＯＤＥＬＳ",
    tags: ['Igreja', 'Batista', 'Contemporânea'],
    biblicalReference: 'Atos 2:42-47, Hebreus 10:25',
    detailedDescription:
      'A Igreja Batista Contemporânea representa a evolução dos locais de adoração cristã ao longo dos séculos. Enquanto os primeiros cristãos se reuniam em casas e catacumbas, e posteriormente construíram catedrais majestosas, as igrejas batistas modernas refletem uma abordagem mais simples e focada na comunidade. Este modelo mostra uma igreja com arquitetura contemporânea, incluindo um santuário espaçoso, salas de aula para estudo bíblico, e áreas de convivência. As igrejas batistas enfatizam o batismo por imersão de crentes, a autonomia da congregação local, e a autoridade das Escrituras. Este modelo serve como um lembrete de que, independentemente do estilo arquitetônico, o importante é que os crentes se reúnam para adorar, aprender e crescer juntos na fé.',
  },
  {
    id: 'bronze-sea',
    title: 'Mar de Fundição',
    description:
      'O Mar de Fundição era uma grande bacia de bronze usada pelos sacerdotes para se lavarem antes de entrar no templo. Era uma peça impressionante de artesanato bíblico.',
    category: 'Objetos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/ehernes-meer-fbe073513a6d4866ba1c12584bc4770a',
    embedUrl:
      'https://sketchfab.com/models/fbe073513a6d4866ba1c12584bc4770a/embed',
    author: 'bibel-in-3d.de',
    tags: ['Mar de Fundição', 'Bronze', 'Templo'],
    biblicalReference: '1 Reis 7:23-26, 2 Crônicas 4:2-5',
    detailedDescription:
      'O Mar de Fundição era uma das peças mais impressionantes do Templo de Salomão. Esta enorme bacia circular de bronze tinha aproximadamente 5 metros de diâmetro e 2,5 metros de altura, com capacidade para cerca de 40.000 litros de água. O Mar era sustentado por doze touros de bronze, três voltados para cada direção cardinal. Os sacerdotes usavam esta bacia para se lavarem antes de entrar no templo para realizar seus deveres sagrados. A água simbolizava a purificação necessária para se aproximar de Deus. O Mar de Fundição era tão grande que Salomão não conseguiu pesá-lo, pois era impossível determinar seu peso. Esta peça demonstrava a magnificência do templo e a importância da pureza ritual na adoração a Deus. O Mar de Fundição prefigurava o batismo cristão e a purificação espiritual que vem através de Cristo.',
  },
  {
    id: 'bronze-cart',
    title: 'Carro de Bronze',
    description:
      'O Carro de Bronze era usado para transportar objetos sagrados do templo. Esta peça demonstra a habilidade artesanal dos israelitas e a importância dos utensílios do templo.',
    category: 'Objetos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/bronze-cart-1d1d548fd53d4389b248104d04a1305d',
    embedUrl:
      'https://sketchfab.com/models/1d1d548fd53d4389b248104d04a1305d/embed',
    author: 'bibel-in-3d.de',
    tags: ['Carro', 'Bronze', 'Transporte'],
    biblicalReference: '1 Reis 7:27-37',
    detailedDescription:
      'Os Carros de Bronze eram peças funcionais e artísticas do Templo de Salomão, usados para transportar água do Mar de Fundição para as várias bacias menores do templo. Cada carro era uma obra-prima de artesanato, com rodas de bronze, eixos, e painéis decorados com leões, touros e querubins. Os carros eram móveis e podiam ser facilmente transportados para onde a água fosse necessária. Esta funcionalidade era essencial para manter a pureza ritual no templo, pois a água era constantemente necessária para as lavagens cerimoniais. Os carros demonstravam tanto a habilidade técnica dos artesãos israelitas quanto a atenção aos detalhes na construção do templo. Cada elemento do templo, mesmo os utensílios funcionais, era criado com beleza e propósito sagrado, refletindo a glória de Deus e a importância da adoração.',
  },
  {
    id: 'house-on-rock',
    title: 'Construção sobre a Rocha',
    description:
      'Este modelo ilustra a parábola de Jesus sobre a casa construída sobre a rocha versus a casa construída sobre a areia. Representa a importância de construir nossa vida sobre fundamentos sólidos.',
    category: 'Eventos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/from-building-a-house-d1e716c5fdf647ee90fc592ab900cc22',
    embedUrl:
      'https://sketchfab.com/models/d1e716c5fdf647ee90fc592ab900cc22/embed',
    author: 'bibel-in-3d.de',
    tags: ['Parábola', 'Rocha', 'Fundamento'],
    biblicalReference: 'Mateus 7:24-29',
    detailedDescription:
      'A parábola da Casa Construída sobre a Rocha é uma das mais conhecidas e poderosas de Jesus, encerrando o Sermão da Montanha. Jesus conta a história de dois construtores: um sábio que constrói sua casa sobre a rocha sólida, e um insensato que constrói sobre a areia. Quando as tempestades, ventos e chuvas vêm, a casa sobre a rocha permanece firme, enquanto a casa sobre a areia desaba completamente. Esta parábola ilustra a diferença entre ouvir e praticar as palavras de Jesus versus apenas ouvi-las sem aplicá-las na vida. A rocha representa Jesus Cristo e seus ensinamentos como fundamento sólido para a vida. Construir sobre a rocha significa basear nossa vida, valores e decisões na Palavra de Deus. As tempestades representam as dificuldades, tentações e provações da vida. Aqueles que constroem sobre Cristo permanecerão firmes, enquanto os que constroem sobre fundamentos instáveis (riqueza, fama, prazeres) serão derrubados.',
  },
  {
    id: 'high-priest',
    title: 'Sumo Sacerdote',
    description:
      'O Sumo Sacerdote era o líder religioso mais importante do povo de Israel. Ele tinha a responsabilidade única de entrar no Santo dos Santos uma vez por ano, no Dia da Expiação, para fazer expiação pelos pecados do povo.',
    category: 'Objetos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/high-priest-173a94b82478415bb56124e137dfa30c',
    embedUrl:
      'https://sketchfab.com/models/173a94b82478415bb56124e137dfa30c/embed',
    author: 'bibel-in-3d.de',
    tags: ['Sumo Sacerdote', 'Sacerdócio', 'Templo'],
    biblicalReference: 'Levítico 16, Hebreus 4-5',
    detailedDescription:
      'O Sumo Sacerdote era a figura mais importante do sistema sacerdotal de Israel, estabelecido por Deus através de Moisés. Vestido com roupas especiais e sagradas, incluindo o éfode, o peitoral com as doze pedras representando as tribos de Israel, e a mitra com a placa de ouro inscrita "Santidade ao Senhor", o Sumo Sacerdote servia como mediador entre Deus e o povo. Sua função mais sagrada era entrar no Santo dos Santos uma vez por ano, no Dia da Expiação (Yom Kippur), para fazer expiação pelos pecados de todo o povo de Israel. Este ritual envolvia o sacrifício de animais e o aspergir do sangue sobre o propiciatório da Arca da Aliança. O Sumo Sacerdote também tinha a responsabilidade de consultar a Deus através do Urim e Tumim, pedras sagradas usadas para discernir a vontade divina. Esta figura prefigurava Jesus Cristo, nosso Sumo Sacerdote eterno, que entrou no santuário celestial uma vez por todas, oferecendo seu próprio sangue como expiação perfeita pelos pecados da humanidade.',
  },
  {
    id: 'open-bible',
    title: 'Bíblia',
    description:
      'A Bíblia Sagrada é a Palavra de Deus, contendo 66 livros divididos em Antigo e Novo Testamento. É o livro mais importante da fé cristã, revelando a história da salvação e os ensinamentos de Deus.',
    category: 'Objetos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/holy-bible-091e139f26554be4844712ab50f8ad2a',
    embedUrl:
      'https://sketchfab.com/models/091e139f26554be4844712ab50f8ad2a/embed',
    author: 'VHM777',
    tags: ['Bíblia', 'Palavra de Deus', 'Escrituras'],
    biblicalReference: '2 Timóteo 3:16-17, Salmos 119:105',
    detailedDescription:
      'A Bíblia Sagrada é a Palavra inspirada de Deus, composta por 66 livros escritos por aproximadamente 40 autores ao longo de 1.500 anos. Dividida em Antigo Testamento (39 livros) e Novo Testamento (27 livros), a Bíblia conta a história completa da salvação, desde a criação do mundo até a consumação de todas as coisas. O Antigo Testamento revela a história do povo de Israel, as leis de Deus, os profetas e a preparação para a vinda do Messias. O Novo Testamento registra a vida, morte e ressurreição de Jesus Cristo, o estabelecimento da Igreja primitiva e as cartas dos apóstolos. A Bíblia é única entre todos os livros porque é inspirada por Deus, infalível e autoritativa. Ela serve como lâmpada para nossos pés e luz para nosso caminho, guiando-nos em todas as áreas da vida. Através das Escrituras, conhecemos o caráter de Deus, a natureza humana, o plano de salvação e os princípios para viver uma vida que agrada a Deus. A Bíblia é o fundamento da fé cristã e a fonte de toda doutrina e prática cristã.',
  },
  {
    id: 'jesus-carrying-cross',
    title: 'Jesus Carregando sua Cruz',
    description:
      'Jesus carregando a cruz representa o caminho doloroso que Ele percorreu até o Calvário. Esta cena mostra o momento em que Jesus, após ser flagelado e coroado com espinhos, carrega a cruz onde seria crucificado, demonstrando seu amor e sacrifício pela humanidade.',
    category: 'Cenas Bíblicas',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/jesus-nazareno-32684fc45b004c6a8ccec99c3c0ead93',
    embedUrl:
      'https://sketchfab.com/models/32684fc45b004c6a8ccec99c3c0ead93/embed',
    author: 'DavidMarcos',
    tags: ['Jesus', 'Cruz', 'Paixão', 'Sacrifício'],
    biblicalReference: 'João 19:17, Lucas 23:26-32',
    detailedDescription:
      'O caminho de Jesus carregando a cruz, conhecido como Via Dolorosa ou Via Crucis, representa um dos momentos mais dolorosos e significativos da Paixão de Cristo. Após ser flagelado, coroado com espinhos e condenado à morte, Jesus foi obrigado a carregar a cruz até o local de sua execução no Monte Calvário (Gólgota). Apesar de ter sido brutalmente torturado e enfraquecido, Jesus carregou voluntariamente a cruz, demonstrando sua obediência à vontade do Pai e seu amor incondicional pela humanidade. Este ato de carregar a cruz simboliza não apenas o sofrimento físico, mas também o peso dos pecados de toda a humanidade que Ele estava prestes a expiar. Simão de Cirene foi compelido pelos soldados romanos a ajudar Jesus a carregar a cruz, mostrando como até mesmo estranhos foram tocados pela compaixão diante do sofrimento de Cristo. Este momento da Paixão nos ensina sobre o verdadeiro significado do discipulado - seguir Jesus significa estar disposto a carregar nossa própria cruz, renunciando a nós mesmos e seguindo-O em obediência e amor.',
  },
  {
    id: 'jesus-crucified',
    title: 'Jesus Crucificado',
    description:
      'A crucificação de Jesus Cristo é o evento central da fé cristã. Jesus foi pregado na cruz, onde sofreu e morreu pelos pecados da humanidade. Este sacrifício representa o amor supremo de Deus e a redenção oferecida a todos que creem.',
    category: 'Cenas Bíblicas',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/jesus-am-kreuz-98608aa89de34123867633a8ced4dc26',
    embedUrl:
      'https://sketchfab.com/models/98608aa89de34123867633a8ced4dc26/embed',
    author: 'noe-3d.at',
    tags: ['Jesus', 'Crucificação', 'Paixão', 'Redenção'],
    biblicalReference: 'João 19:17-30, Mateus 27:32-56',
    detailedDescription:
      'A crucificação de Jesus Cristo é o evento mais significativo da história humana e o fundamento da fé cristã. Jesus foi crucificado no Monte Calvário (Gólgota), onde sofreu uma morte agonizante e humilhante, reservada aos piores criminosos do Império Romano. A crucificação envolvia pregar as mãos e pés do condenado em uma cruz de madeira, deixando-o pendurado até morrer por asfixia ou choque. Jesus, porém, não era um criminoso comum - Ele era o Filho de Deus, inocente e sem pecado, que voluntariamente se ofereceu como sacrifício pelos pecados de toda a humanidade. Durante as seis horas que passou na cruz, Jesus pronunciou sete declarações memoráveis, incluindo "Pai, perdoa-lhes, porque não sabem o que fazem" e "Está consumado". Sua morte na cruz cumpriu as profecias do Antigo Testamento e estabeleceu a Nova Aliança entre Deus e a humanidade. Através de sua morte sacrificial, Jesus pagou o preço pelos nossos pecados, oferecendo perdão, reconciliação com Deus e vida eterna a todos que creem nEle. A cruz, que era um instrumento de tortura e vergonha, tornou-se o símbolo máximo do amor de Deus e da vitória sobre o pecado e a morte.',
  },
];

const Model3DViewer: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const navigate = useNavigate();
  const [model, setModel] = useState<Model3D | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (modelId) {
      const foundModel = models3D.find((m) => m.id === modelId);
      if (foundModel) {
        setModel(foundModel);
      } else {
        navigate('/modelos-3d');
      }
      setIsLoading(false);
    }
  }, [modelId, navigate]);

  const handleShare = async () => {
    if (navigator.share && model) {
      try {
        await navigator.share({
          title: model.title,
          text: model.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='animate-pulse'>
          <div className='h-8 bg-gray-200 rounded w-1/3 mb-4'></div>
          <div className='h-96 bg-gray-200 rounded mb-4'></div>
          <div className='h-4 bg-gray-200 rounded w-2/3'></div>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h1 className='text-2xl font-bold text-bible-text mb-4'>
          Modelo não encontrado
        </h1>
        <Link to='/modelos-3d'>
          <Button>Voltar aos Modelos 3D</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Header com navegação */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            onClick={() => navigate('/modelos-3d')}
            className='flex items-center gap-2'
          >
            <ArrowLeft className='w-4 h-4' />
            Voltar
          </Button>
          <div className='h-6 w-px bg-gray-300'></div>
          <span className='text-sm text-bible-text/60'>{model.category}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' onClick={handleShare}>
            <Share2 className='w-4 h-4 mr-2' />
            Compartilhar
          </Button>
          <Button variant='outline' size='sm' asChild>
            <a
              href={model.sketchfabUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              <ExternalLink className='w-4 h-4 mr-2' />
              Sketchfab
            </a>
          </Button>
        </div>
      </div>

      {/* Título e descrição */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold text-bible-text mb-4'>
          {model.title}
        </h1>
        <p className='text-lg text-bible-text/70 max-w-4xl'>
          {model.description}
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Modelo 3D - Ocupa 2/3 da largura */}
        <div className='lg:col-span-2'>
          <Card className='overflow-hidden'>
            <CardHeader className='pb-4'>
              <CardTitle className='text-xl'>Visualização 3D</CardTitle>
              <CardDescription>
                Explore o modelo interativo. Use o mouse para rotacionar, zoom e
                navegar.
              </CardDescription>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='aspect-[4/3] bg-gray-100 relative'>
                <iframe
                  title={model.title}
                  src={model.embedUrl}
                  frameBorder='0'
                  allowFullScreen
                  allow='autoplay; fullscreen; xr-spatial-tracking'
                  className='w-full h-full absolute inset-0'
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Informações do modelo - Ocupa 1/3 da largura */}
        <div className='space-y-6'>
          {/* Informações básicas */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Informações</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <h4 className='font-semibold text-bible-text mb-2'>
                  Referência Bíblica:
                </h4>
                <p className='text-bible-accent font-medium'>
                  {model.biblicalReference}
                </p>
              </div>
              <div>
                <h4 className='font-semibold text-bible-text mb-2'>
                  Categoria:
                </h4>
                <Badge variant='secondary'>{model.category}</Badge>
              </div>
              <div>
                <h4 className='font-semibold text-bible-text mb-2'>Autor:</h4>
                <p className='text-bible-text/80'>{model.author}</p>
              </div>
              <div>
                <h4 className='font-semibold text-bible-text mb-2'>Tags:</h4>
                <div className='flex flex-wrap gap-2'>
                  {model.tags.map((tag) => (
                    <Badge key={tag} variant='outline' className='text-xs'>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Descrição detalhada */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg flex items-center gap-2'>
                <BookOpen className='w-5 h-5' />
                Descrição Detalhada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-bible-text/80 leading-relaxed'>
                {model.detailedDescription || model.description}
              </p>
            </CardContent>
          </Card>

          {/* Controles */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Controles</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='text-sm text-bible-text/70 space-y-2'>
                <p>
                  <strong>Mouse:</strong> Clique e arraste para rotacionar
                </p>
                <p>
                  <strong>Scroll:</strong> Zoom in/out
                </p>
                <p>
                  <strong>Botão direito:</strong> Pan
                </p>
                <p>
                  <strong>Duplo clique:</strong> Reset view
                </p>
              </div>
              <Button
                variant='outline'
                className='w-full'
                onClick={() => {
                  const iframe = document.querySelector('iframe');
                  if (iframe) {
                    iframe.requestFullscreen();
                  }
                }}
              >
                <ExternalLink className='w-4 h-4 mr-2' />
                Tela Cheia
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Seção de modelos relacionados */}
      <div className='mt-12'>
        <h2 className='text-2xl font-bold text-bible-text mb-6'>
          Modelos Relacionados
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {models3D
            .filter((m) => m.id !== model.id && m.category === model.category)
            .slice(0, 3)
            .map((relatedModel) => (
              <Card
                key={relatedModel.id}
                className='cursor-pointer hover:shadow-lg transition-shadow'
              >
                <CardContent className='p-4'>
                  <h3 className='font-semibold text-bible-text mb-2'>
                    {relatedModel.title}
                  </h3>
                  <p className='text-sm text-bible-text/60 mb-3 line-clamp-2'>
                    {relatedModel.description}
                  </p>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => navigate(`/modelos-3d/${relatedModel.id}`)}
                    className='w-full'
                  >
                    Ver Modelo
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Model3DViewer;
