import { CartItem, Product } from "@/types/product";
import { v4 as uuidv4 } from "uuid";

// make a
export const fishProducts: Product[] = [
  {
    id: 1,
    name: "Betta Fish (Siamese Fighting Fish)",
    price: 14.99,
    description:
      "Vibrant, solitary fish with flowing fins. Requires minimum 3-gallon tank with heater. Each must be kept separately.",
  },
  {
    id: 2,
    name: "Guppy",
    price: 3.99,
    description:
      "Colorful, peaceful community fish. Males display vibrant patterns while females are larger and less colorful. Ideal for beginners.",
  },
  {
    id: 3,
    name: "Neon Tetra",
    price: 2.49,
    description:
      "Small, schooling fish with bright blue and red stripes. Peaceful temperament, best kept in groups of 6 or more.",
  },
  {
    id: 4,
    name: "Goldfish (Common)",
    price: 5.99,
    description:
      "Classic orange freshwater fish. Grows large and requires significant tank space. Hardy and suitable for beginners.",
  },
  {
    id: 5,
    name: "Fancy Goldfish (Oranda)",
    price: 18.99,
    description:
      "Goldfish variety with distinctive head growth called a 'wen.' Available in various colors and requires clean water.",
  },
  {
    id: 6,
    name: "Platy",
    price: 4.49,
    description:
      "Peaceful, colorful livebearers that come in various patterns. Easy to care for and compatible with many community tanks.",
  },
  {
    id: 7,
    name: "Molly",
    price: 4.99,
    description:
      "Adaptable livebearers that can thrive in fresh or brackish water. Come in black, white, orange, and dalmatian patterns.",
  },
  {
    id: 8,
    name: "Angelfish",
    price: 12.99,
    description:
      "Elegant, triangular-shaped cichlids with long fins. Semi-aggressive and require tall tanks due to their height.",
  },
  {
    id: 9,
    name: "Corydoras Catfish",
    price: 6.99,
    description:
      "Peaceful bottom-dwelling catfish that help clean up debris. Social fish that should be kept in groups of 4 or more.",
  },
  {
    id: 10,
    name: "Discus",
    price: 45.99,
    description:
      "Colorful, disc-shaped cichlids considered the 'king of aquariums.' Require pristine water conditions and more experienced care.",
  },
  {
    id: 11,
    name: "Zebra Danio",
    price: 2.99,
    description:
      "Active, striped fish that are hardy and easy to care for. Fast swimmers that do best in schools and longer tanks.",
  },
  {
    id: 12,
    name: "Cherry Barb",
    price: 4.49,
    description:
      "Peaceful, small fish with males displaying bright red coloration. Prefer planted tanks and groups of 5 or more.",
  },
  {
    id: 13,
    name: "Clown Loach",
    price: 9.99,
    description:
      "Social, striped bottom-dwellers that can grow quite large. Effective snail controllers with playful personalities.",
  },
  {
    id: 14,
    name: "Gourami (Dwarf)",
    price: 6.99,
    description:
      "Colorful labyrinth fish that can breathe air from the surface. Generally peaceful but males may be territorial.",
  },
  {
    id: 15,
    name: "Plecostomus",
    price: 8.99,
    description:
      "Algae-eating catfish that helps keep tanks clean. Common varieties can grow very large and require spacious tanks.",
  },
  {
    id: 16,
    name: "Swordtail",
    price: 5.49,
    description:
      "Active, colorful livebearer with males displaying a sword-like lower tail extension. Peaceful and good for community tanks.",
  },
  {
    id: 17,
    name: "Rainbowfish",
    price: 11.99,
    description:
      "Vibrant, active schooling fish that display their best colors in groups. Require longer tanks for swimming.",
  },
  {
    id: 18,
    name: "Koi",
    price: 24.99,
    description:
      "Ornamental variety of carp available in various color patterns. Typically kept in ponds but small varieties available for large tanks.",
  },
  {
    id: 19,
    name: "Killifish",
    price: 9.99,
    description:
      "Small, vibrantly colored fish with striking patterns. Many varieties available, some with specific care requirements.",
  },
  {
    id: 20,
    name: "Rasbora",
    price: 3.49,
    description:
      "Small, peaceful schooling fish with distinct coloration. Low maintenance and excellent for community tanks.",
  },
];

export const checkoutBillItems: CartItem[] = fishProducts
  .filter((_, index) => index < 4)
  .reduce((acc, product) => {
    return [
      ...acc,
      {
        ...product,
        quantity: 1,
      },
    ];
  }, [] as CartItem[]);
