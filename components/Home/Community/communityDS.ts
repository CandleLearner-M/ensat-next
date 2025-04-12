import mrSarsri from "@/assets/Mr.Sarsri.jpg";
import mrMoussa from "@/assets/Mr.Moussa.jpg";
import { StaticImageData } from "next/image";

export interface SliderItem {
  className: string;
  url: string | StaticImageData;
  alt: string;
  slug: string;
  title: string;
  text: string;
}

export const imageBlocks: SliderItem[] = [
  {
    className: "div2",
    url: "https://media.licdn.com/dms/image/v2/D4E03AQE4GL_gxfo-7w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720294013244?e=1749686400&v=beta&t=InubEb6b0MFAAErR26tT36O8GWCNF3-fyVhllDi0S4g",
    alt: "Headphones on wooden surface",
    slug: "john-doe-profile",
    title: "John Doe",
    text: "Passionate educator blending tech and teaching with style.",
  },
  {
    className: "div3",
    url: mrSarsri,
    alt: "Classic camera on table",
    slug: "mr-sarsri",
    title: "Mr. Sarsri",
    text: "Known for his intense classes and legendary catchphrases.",
  },
  {
    className: "div4",
    url: "https://media.licdn.com/dms/image/v2/D4E03AQHdwSTZbgiXOw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718216850789?e=1749686400&v=beta&t=Ryl3vZ-uNln1XSWVVOsh-t8MazmUJtxy5OkV59zPFwU",
    alt: "Retro computer keyboard",
    slug: "dr-keyboard",
    title: "Dr. Keyboard",
    text: "Breaks down complex algorithms like it's poetry.",
  },
  {
    className: "div5",
    url: "https://ensat.ac.ma/Portail/wp-content/uploads/2022/05/50f86152-ead8-4dea-9398-b1aba89058f8-768x959.jpg",
    alt: "Typewriter on desk",
    slug: "classic-genius",
    title: "The Archivist",
    text: "Keeps all knowledge archived in a sharp memory bank.",
  },
  {
    className: "div6",
    url: "https://media.licdn.com/dms/image/v2/D4E03AQFhWvcM8jiTJw/profile-displayphoto-shrink_800_800/B4EZYpjnMWHcAc-/0/1744453924068?e=1749686400&v=beta&t=1j3aYQ-sN7JdRxfhNN1VQNKDveF_qMdUxwxRgtm6R-k",
    alt: "Succulent plant in white pot",
    slug: "ms-green-thumb",
    title: "Mostafa El Issati",
    text: "Brings life to the room—literally and intellectually.",
  },
  {
    className: "div7",
    url: "https://ensat.ac.ma/Portail/wp-content/uploads/2022/05/e3101afb-c762-4a40-b96a-931d39bf70cd..-731x1024.jpg",
    alt: "Stylish sunglasses",
    slug: "the-chill-lecturer",
    title: "Mr. Smooth",
    text: "Too cool to stress. Explains calculus like it’s jazz.",
  },
  {
    className: "div8",
    url: "https://media.licdn.com/dms/image/v2/D4E03AQGbGX_FHY5OVA/profile-displayphoto-shrink_800_800/B4EZOER_IaHwAg-/0/1733091129842?e=1749686400&v=beta&t=Nyk5rFs93g0_9Hto1x2XEUvtKCHuvqq2e04bsXk7NOo",
    alt: "Wristwatch on brown surface",
    slug: "timekeeper",
    title: "Dr. Timekeeper",
    text: "Always punctual. Deadlines fear this one.",
  },
  {
    className: "div9",
    url: "https://media.licdn.com/dms/image/v2/C4D03AQFsNDnmQFes0w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1632666354684?e=1749686400&v=beta&t=nNATRlNlfP1SMGp0tmyKyDIHqVB5HUFwSijfHSdm_mw",
    alt: "Chair next to minimalist desk",
    slug: "minimalist-mind",
    title: "Minimalist Mentor",
    text: "Clear desk, clear thoughts, complex solutions.",
  },
  {
    className: "div10",
    url: "https://media.licdn.com/dms/image/v2/D4E22AQET5VnAzzQXKA/feedshare-shrink_2048_1536/B4EZPj3nsOHsAs-/0/1734694834431?e=1747267200&v=beta&t=H8hXYHtEGryl8FDncJn4mpxKK_121fY6TG6Fks814AQ",
    alt: "Backpack on the floor",
    slug: "on-the-go",
    title: "Mr. Nomad",
    text: "Always moving, always teaching, always iconic.",
  },
  {
    className: "div11",
    url: "https://media.licdn.com/dms/image/v2/D4E03AQFv647aNIrqqg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1709768315909?e=1749686400&v=beta&t=g7FvPdr3x7_K4TFaUflCgR06Y1iCnr6nYvn3dJB3pNQ",
    alt: "Vinyl record player",
    slug: "old-school",
    title: "Professor Vibes",
    text: "Teaches with flair, leaves you with a melody of knowledge.",
  },
  {
    className: "div12",
    url: "https://media.licdn.com/dms/image/v2/D4E03AQFy5bcYTZyziQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674758159494?e=1749686400&v=beta&t=4HxJEbq1J0dogn1ynuSXKEnhSInpdAkWmvtZu5BEnLA",
    alt: "Desk lamp with glowing bulb",
    slug: "lightbulb-moment",
    title: "Ms. Eureka",
    text: "Lights up the room—and your brain—with ideas.",
  },
  {
    className: "div13",
    url: mrMoussa,
    alt: "Books stacked on a table",
    slug: "mr-moussa",
    title: "Mr. Moussa",
    text: "Sharp as ever. Math trembles at his presence.",
  },
];
