"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ChevronDown, SlidersHorizontal, X, Search } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────── */
interface Product {
  id: number;
  name: string;
  slug: string;
  brand: "Apple" | "Samsung";
  image: string;
  priceMin: number;
  priceMax: number;
  regularPrice?: number;
  onSale: boolean;
  rating?: number;
  colors: string[];
  condition: string[];
  capacity: string[];
}

/* ─── All 29 Static Products ─────────────────────────────── */
const ALL_PRODUCTS: Product[] = [
  // Samsung
  {
    id: 1,
    name: "Galaxy S21 5G",
    slug: "galaxy-s21-5g",
    brand: "Samsung",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/03/Galaxy-S21-2-300x307.jpg",
    priceMin: 176.47,
    priceMax: 235.29,
    onSale: true,
    colors: ["Gray", "Purple", "White", "Pink"],
    condition: ["A1-stock", "A2-Stock", "B1-Stock"],
    capacity: ["128GB", "256GB"],
  },
  {
    id: 2,
    name: "Galaxy S21 Ultra 5G",
    slug: "galaxy-s21-ultra-5g",
    brand: "Samsung",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/03/Galaxy-S21-300x408.jpg",
    priceMin: 247.06,
    priceMax: 305.88,
    onSale: true,
    colors: ["Black", "Silver", "Navy"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 3,
    name: "Galaxy S22",
    slug: "galaxy-s22",
    brand: "Samsung",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/03/Post_4-scaled-300x500.jpg",
    priceMin: 188.24,
    priceMax: 247.06,
    onSale: true,
    colors: ["Black", "White", "Green", "Pink Gold"],
    condition: ["A1-stock", "A2-Stock", "B1-Stock"],
    capacity: ["128GB", "256GB"],
  },
  {
    id: 4,
    name: "Galaxy S22 Ultra 5G",
    slug: "galaxy-s22-ultra-5g",
    brand: "Samsung",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/03/Galaxy-S22-5G-300x307.jpg",
    priceMin: 388.24,
    priceMax: 388.24,
    regularPrice: 485.29,
    onSale: true,
    colors: ["Black", "White", "Burgundy", "Green"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 5,
    name: "Galaxy S22+ 5G",
    slug: "galaxy-s22-5g",
    brand: "Samsung",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/03/samsung-mobile-300x300.png",
    priceMin: 223.53,
    priceMax: 329.41,
    onSale: true,
    colors: ["Black", "White", "Green", "Pink Gold"],
    condition: ["A1-stock", "A2-Stock", "B1-Stock"],
    capacity: ["128GB", "256GB"],
  },
  {
    id: 6,
    name: "Galaxy S23",
    slug: "galaxy-s23",
    brand: "Samsung",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/pOST_3-21-5-scaled-300x500.jpg",
    priceMin: 294.12,
    priceMax: 376.47,
    onSale: true,
    colors: ["Black", "Cream", "Green", "Lavender"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB"],
  },
  {
    id: 7,
    name: "Galaxy S23+",
    slug: "galaxy-s23-plus",
    brand: "Samsung",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_1-45-300x362.jpg",
    priceMin: 388.24,
    priceMax: 482.35,
    onSale: true,
    colors: ["Black", "Cream", "Green", "Lavender"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["256GB", "512GB"],
  },
  {
    id: 8,
    name: "Galaxy S24",
    slug: "galaxy-s24",
    brand: "Samsung",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Galaxy-s24-300x408.jpg",
    priceMin: 423.53,
    priceMax: 458.82,
    onSale: true,
    colors: ["Black", "Marble Gray", "Cobalt Violet", "Amber Yellow"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB"],
  },
  {
    id: 9,
    name: "Galaxy Tab S8+ 5G",
    slug: "galaxy-tab-s8-5g",
    brand: "Samsung",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/galaxy-tab-300x376.jpg",
    priceMin: 282.35,
    priceMax: 282.35,
    regularPrice: 352.94,
    onSale: true,
    colors: ["Graphite", "Silver", "Pink Gold"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB"],
  },
  {
    id: 10,
    name: "Galaxy Z Flip4 5G",
    slug: "galaxy-z-flip4-5g",
    brand: "Samsung",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/z-flip-300x334.jpg",
    priceMin: 305.88,
    priceMax: 305.88,
    regularPrice: 382.35,
    onSale: true,
    colors: ["Bora Purple", "Graphite", "Pink Gold", "Blue"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB"],
  },
  // Apple
  {
    id: 11,
    name: "iPhone 11",
    slug: "iphone-11",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_1-48-300x405.jpg",
    priceMin: 211.76,
    priceMax: 288.24,
    onSale: true,
    colors: ["Black", "White", "Red", "Purple", "Green", "Yellow"],
    condition: ["A1-stock", "A2-Stock", "B1-Stock", "B2-Stock"],
    capacity: ["64GB", "128GB", "256GB"],
  },
  {
    id: 12,
    name: "iPhone 12",
    slug: "iphone-12",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/iPhone_12-300x408.jpg",
    priceMin: 205.88,
    priceMax: 311.76,
    onSale: true,
    colors: ["Black", "White", "Red", "Blue", "Green", "Purple"],
    condition: ["A1-stock", "A2-Stock", "B1-Stock"],
    capacity: ["64GB", "128GB", "256GB"],
  },
  {
    id: 13,
    name: "iPhone 12 Mini",
    slug: "iphone-12-mini",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_2-40-scaled-300x500.jpg",
    priceMin: 129.41,
    priceMax: 241.18,
    onSale: true,
    colors: ["Black", "White", "Red", "Blue", "Green", "Purple"],
    condition: ["A1-stock", "A2-Stock", "B1-Stock", "B2-Stock"],
    capacity: ["64GB", "128GB", "256GB"],
  },
  {
    id: 14,
    name: "iPhone 12 Pro",
    slug: "iphone-12-pro",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/iphone-12-pro_1-300x408.jpg",
    priceMin: 294.12,
    priceMax: 352.94,
    onSale: true,
    colors: ["Silver", "Graphite", "Gold", "Pacific Blue"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 15,
    name: "iPhone 12 Pro Max",
    slug: "iphone-12-pro-max",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post-1-300x403.jpg",
    priceMin: 411.76,
    priceMax: 470.59,
    onSale: true,
    colors: ["Silver", "Graphite", "Gold", "Pacific Blue"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 16,
    name: "iPhone 13 Pro",
    slug: "iphone-13-pro",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_1-45-11-300x386.jpg",
    priceMin: 382.35,
    priceMax: 482.35,
    onSale: true,
    rating: 5,
    colors: ["Silver", "Graphite", "Gold", "Sierra Blue", "Alpine Green"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 17,
    name: "iPhone 13 Pro Max",
    slug: "iphone-13-pro-max",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_3-21-1-scaled-300x500.jpg",
    priceMin: 470.59,
    priceMax: 600.0,
    onSale: true,
    colors: ["Silver", "Graphite", "Gold", "Sierra Blue", "Alpine Green"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 18,
    name: "iPhone 14",
    slug: "iphone-14",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_1-46-300x394.jpg",
    priceMin: 382.35,
    priceMax: 470.59,
    onSale: true,
    colors: ["Midnight", "Starlight", "Blue", "Purple", "Red"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 19,
    name: "iPhone 14 Plus",
    slug: "iphone-14-plus",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_1-45-7-300x405.jpg",
    priceMin: 423.53,
    priceMax: 458.82,
    onSale: true,
    colors: ["Midnight", "Starlight", "Blue", "Purple", "Red"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 20,
    name: "iPhone 14 Plus PSIM",
    slug: "iphone-14-plus-psim",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_1-45-2-300x405.jpg",
    priceMin: 511.76,
    priceMax: 564.71,
    onSale: true,
    colors: ["Midnight", "Starlight", "Blue", "Purple", "Red"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB"],
  },
  {
    id: 21,
    name: "iPhone 14 Pro",
    slug: "iphone-14-pro",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_1-45-3-300x368.jpg",
    priceMin: 505.88,
    priceMax: 576.47,
    onSale: true,
    colors: ["Space Black", "Silver", "Gold", "Deep Purple"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 22,
    name: "iPhone 14 Pro Max",
    slug: "iphone-14-pro-max",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_1-45-8-300x370.jpg",
    priceMin: 629.41,
    priceMax: 664.71,
    onSale: true,
    colors: ["Space Black", "Silver", "Gold", "Deep Purple"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 23,
    name: "iPhone 14 Pro Max PSIM",
    slug: "iphone-14-pro-max-psim",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_1-45-5-300x370.jpg",
    priceMin: 647.06,
    priceMax: 776.47,
    onSale: true,
    colors: ["Space Black", "Silver", "Gold", "Deep Purple"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 24,
    name: "iPhone 14 Pro PSIM",
    slug: "iphone-14-pro-psim",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_1-45-9-300x368.jpg",
    priceMin: 576.47,
    priceMax: 647.06,
    onSale: true,
    colors: ["Space Black", "Silver", "Gold", "Deep Purple"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 25,
    name: "iPhone 15",
    slug: "iphone-15",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_1-47-300x389.jpg",
    priceMin: 535.29,
    priceMax: 629.41,
    onSale: true,
    colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 26,
    name: "iPhone 15 Plus",
    slug: "iphone-15-plus",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/iphone_15-plus-300x408.jpg",
    priceMin: 523.53,
    priceMax: 658.82,
    onSale: true,
    colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 27,
    name: "iPhone 15 PSIM",
    slug: "iphone-15-psim",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_1-45-6-300x389.jpg",
    priceMin: 611.76,
    priceMax: 641.19,
    onSale: true,
    colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 28,
    name: "iPhone 16",
    slug: "iphone-16",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/iphone_16-c-300x389.jpg",
    priceMin: 582.35,
    priceMax: 741.18,
    onSale: true,
    colors: ["Black", "White", "Pink", "Teal", "Ultramarine"],
    condition: ["A1-stock", "A2-Stock"],
    capacity: ["128GB", "256GB", "512GB"],
  },
  {
    id: 29,
    name: "iPhone SE 3",
    slug: "iphone-se-3",
    brand: "Apple",
    image:
      "https://wp.golitemobile.com/wp-content/uploads/2025/04/Post_3-22-scaled-300x500.jpg",
    priceMin: 123.53,
    priceMax: 217.65,
    onSale: true,
    colors: ["Midnight", "Starlight", "Red"],
    condition: ["A1-stock", "A2-Stock", "B1-Stock"],
    capacity: ["64GB", "128GB", "256GB"],
  },
];

const ALL_CONDITIONS = [
  "A1-stock",
  "A2-Stock",
  "B1-Stock",
  "B2-Stock",
  "C-Stock",
  "C1-Stock",
  "C2-Stock",
  "RC1-Stock",
  "RC2-Stock",
];
const ALL_CAPACITIES = ["128GB", "256GB", "512GB", "64GB"];
const ALL_COLORS = [
  "Black",
  "Blue",
  "Cream",
  "Gold",
  "Graphite",
  "Green",
  "Lavender",
  "Pink",
  "Pink Gold",
  "Purple",
  "Red",
  "Silver",
  "Teal",
  "Ultramarine",
  "Violet",
  "White",
  "Yellow",
];
const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Top Rated", value: "rated" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];
const PER_PAGE = 9;

function fmtPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);
}

/* ─── Checkbox Group ─────────────────────────────────────── */
function CheckGroup({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: string[];
  selected: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-3">
      <button
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-800"
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="mt-2 space-y-1.5 max-h-44 overflow-y-auto">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onChange(opt)}
                className="w-3.5 h-3.5 accent-orange-500 rounded"
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Product Card ───────────────────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const hasRange = product.priceMin !== product.priceMax;

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col"
      onClick={() => router.push(`/phones/${product.slug}`)}
    >
      <div className="relative bg-gray-50 flex items-center justify-center h-48">
        {product.onSale && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            Sale!
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-auto object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/img/logo.png";
          }}
        />
      </div>

      <div className="p-3 flex flex-col flex-1 border-t border-gray-100">
        {product.rating && (
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < product.rating! ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}

        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1">
          {product.name}
        </h3>

        <div className="mt-auto pt-2">
          {product.regularPrice && (
            <p className="text-xs text-gray-400 line-through">
              {fmtPrice(product.regularPrice)}
            </p>
          )}
          <p className="text-sm font-bold text-gray-800 mb-2">
            {hasRange
              ? `${fmtPrice(product.priceMin)} – ${fmtPrice(product.priceMax)}`
              : fmtPrice(product.priceMin)}
            {hasRange && (
              <span className="text-[10px] font-normal text-gray-400 ml-1">
                Price range
              </span>
            )}
          </p>

          <button
            className="w-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-xs font-semibold py-1.5 rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/phones/${product.slug}`);
            }}
          >
            Select options
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function PhonesPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [sortOpen, setSortOpen] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [capacities, setCapacities] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) => {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
    setPage(1);
  };

  const clearAll = () => {
    setBrands([]);
    setConditions([]);
    setCapacities([]);
    setColors([]);
    setMinPrice(0);
    setMaxPrice(1000);
    setSearch("");
    setPage(1);
  };

  const activeCount =
    brands.length +
    conditions.length +
    capacities.length +
    colors.length +
    (search ? 1 : 0) +
    (maxPrice < 1000 || minPrice > 0 ? 1 : 0);

  const filtered = useMemo(() => {
    let r = ALL_PRODUCTS.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (conditions.length && !p.condition.some((c) => conditions.includes(c)))
        return false;
      if (capacities.length && !p.capacity.some((c) => capacities.includes(c)))
        return false;
      if (
        colors.length &&
        !p.colors.some((pc) =>
          colors.some((fc) => pc.toLowerCase().includes(fc.toLowerCase())),
        )
      )
        return false;
      if (p.priceMin > maxPrice || p.priceMax < minPrice) return false;
      return true;
    });
    if (sortBy === "price_asc")
      r = [...r].sort((a, b) => a.priceMin - b.priceMin);
    if (sortBy === "price_desc")
      r = [...r].sort((a, b) => b.priceMax - a.priceMax);
    if (sortBy === "rated")
      r = [...r].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return r;
  }, [search, brands, conditions, capacities, colors, maxPrice, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const start = filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const end = Math.min(page * PER_PAGE, filtered.length);

  /* Sidebar content — used both desktop & mobile drawer */
  const Sidebar = (
    <div>
      {/* Search */}
      <div className="pb-3 border-b border-gray-100 mb-1">
        <p className="text-sm font-semibold text-gray-800 mb-2">Search</p>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          {search && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => {
                setSearch("");
                setPage(1);
              }}
            >
              <X className="w-3 h-3 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Brand */}
      <div className="border-b border-gray-100 py-3">
        <p className="text-sm font-semibold text-gray-800 mb-2">Brand</p>
        {["Apple", "Samsung"].map((b) => (
          <label
            key={b}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer mb-1.5"
          >
            <input
              type="checkbox"
              checked={brands.includes(b)}
              onChange={() => toggle(brands, setBrands, b)}
              className="w-3.5 h-3.5 accent-orange-500"
            />
            {b}
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="border-b border-gray-100 py-3">
        <p className="text-sm font-semibold text-gray-800 mb-3">Price</p>

        {/* Dual range track */}
        <div
          className="relative h-1.5 bg-gray-200 rounded-full mx-1 mb-4"
          style={{ marginTop: "10px" }}
        >
          {/* Filled track between handles */}
          <div
            className="absolute h-1.5 bg-orange-500 rounded-full pointer-events-none"
            style={{
              left: `${(minPrice / 1000) * 100}%`,
              right: `${100 - (maxPrice / 1000) * 100}%`,
            }}
          />
          {/* Min handle — always on top when near max */}
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={minPrice}
            onChange={(e) => {
              const val = Math.min(Number(e.target.value), maxPrice - 10);
              setMinPrice(val);
              setPage(1);
            }}
            className="price-range-input"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              margin: 0,
              opacity: 0,
              cursor: "pointer",
              zIndex: minPrice >= maxPrice - 10 ? 5 : 3,
            }}
          />
          {/* Max handle */}
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={maxPrice}
            onChange={(e) => {
              const val = Math.max(Number(e.target.value), minPrice + 10);
              setMaxPrice(val);
              setPage(1);
            }}
            className="price-range-input"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              margin: 0,
              opacity: 0,
              cursor: "pointer",
              zIndex: 4,
            }}
          />
          {/* Visual min thumb */}
          <div
            className="absolute w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow pointer-events-none"
            style={{
              left: `calc(${(minPrice / 1000) * 100}% - 8px)`,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
          />
          {/* Visual max thumb */}
          <div
            className="absolute w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow pointer-events-none"
            style={{
              left: `calc(${(maxPrice / 1000) * 100}% - 8px)`,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
          />
        </div>

        {/* Price labels */}
        <div className="flex justify-between text-xs text-gray-600 font-medium mt-2">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      <CheckGroup
        title="Select Color"
        options={ALL_COLORS}
        selected={colors}
        onChange={(v) => toggle(colors, setColors, v)}
      />
      <CheckGroup
        title="Select Mobile Condition"
        options={ALL_CONDITIONS}
        selected={conditions}
        onChange={(v) => toggle(conditions, setConditions, v)}
      />
      <CheckGroup
        title="Select Capacity"
        options={ALL_CAPACITIES}
        selected={capacities}
        onChange={(v) => toggle(capacities, setCapacities, v)}
      />

      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-2 rounded transition-colors"
        >
          Clear All ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#f5f5f5]">
        {/* Top action bar */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">
              Filter Product
            </span>

            {/* Sort dropdown */}
            <div className="relative ml-2">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-1.5 border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-600 hover:border-orange-400 bg-white"
              >
                Sort By: {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`}
                />
              </button>
              {sortOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded border shadow-lg z-30">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setSortOpen(false);
                        setPage(1);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${sortBy === opt.value ? "text-orange-500 font-semibold" : "text-gray-700"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Active chips */}
            {[...brands, ...conditions, ...capacities, ...colors].map(
              (chip) => (
                <span
                  key={chip}
                  className="flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-700 text-xs px-2 py-1 rounded-full"
                >
                  {chip}
                  <button
                    onClick={() => {
                      if (brands.includes(chip))
                        toggle(brands, setBrands, chip);
                      else if (conditions.includes(chip))
                        toggle(conditions, setConditions, chip);
                      else if (capacities.includes(chip))
                        toggle(capacities, setCapacities, chip);
                      else toggle(colors, setColors, chip);
                    }}
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ),
            )}

            {/* Mobile filter toggle */}
            <button
              className="ml-auto md:hidden flex items-center gap-1.5 border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-600"
              onClick={() => setMobileOpen(true)}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters {activeCount > 0 && `(${activeCount})`}
            </button>
          </div>
        </div>

        {/* Mobile filter drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-900">Filter Product</h2>
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              {Sidebar}
              <button
                className="mt-4 w-full bg-orange-500 text-white py-2.5 rounded font-semibold text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-60 flex-shrink-0 bg-white rounded-xl border border-gray-200 p-4 self-start sticky top-4">
            <h2 className="font-bold text-gray-900 mb-3 text-sm">
              Filter Product
            </h2>
            {Sidebar}
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-gray-900 mb-1">
              All Product
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {filtered.length === 0
                ? "No results found"
                : `Showing ${start}–${end} of ${filtered.length} results`}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 mb-3">
                  No phones match your filters.
                </p>
                <button
                  onClick={clearAll}
                  className="text-orange-500 hover:underline text-sm font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {paginated.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1 mt-8">
                {page > 1 && (
                  <button
                    onClick={() => setPage(page - 1)}
                    className="w-8 h-8 border border-gray-300 rounded text-sm text-gray-600 hover:border-orange-400 flex items-center justify-center"
                  >
                    ←
                  </button>
                )}
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-8 h-8 rounded border text-sm font-medium transition-colors ${
                      page === i + 1
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "border-gray-300 text-gray-600 hover:border-orange-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                {page < totalPages && (
                  <button
                    onClick={() => setPage(page + 1)}
                    className="w-8 h-8 border border-gray-300 rounded text-sm text-gray-600 hover:border-orange-400 flex items-center justify-center"
                  >
                    →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
