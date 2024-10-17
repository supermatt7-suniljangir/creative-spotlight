import Filter from "./Filter";
import SortBy from "./SortBy";
const filters=[
  { value: "all", label: "All" },
  { value: "UI/UX", label: "UI/UX" },
  { value: "Web Design", label: "Web Design" },
  { value: "Illustration", label: "Illustration" },
  { value: "Logo/Banner", label: "logo/banner" },
  { value: "Product Design", label: "Product Design" },
  { value: "Fashion", label: "Fashion" },
  { value: "Branding", label: "Branding" },
  { value: "Graphic Design", label: "Graphic Design" },
]
const sorts = [
  { value: "created_at-desc", label: "Sort by date (recent first)" },
  { value: "created_at-asc", label: "Sort by date (earlier first)" },
  {
    value: "likes-desc",
    label: "Sort by likes (high first)",
  },
  { value: "likes-asc", label: "Sort by likes (low first)" },
];

function ProjectsTableOperations({renderOperations}) {
  return (
    <div className="flex md:justify-between gap-4 items-end md:flex-row flex-col md:px-6 px-2 my-4 text-[var(--color-light)]">
{renderOperations === "sort" ? <SortBy
        options={sorts}
      /> :<>
      <SortBy
        options={sorts}
      />
      <Filter
      filterField="category"
      options={filters}
    /></> }
      

      
    </div>
  );
}

export default ProjectsTableOperations;
