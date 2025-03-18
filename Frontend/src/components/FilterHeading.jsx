import { Button } from "../components/ui/button";

export default function FilterHeading({title, prop, def, dispatch, projectFilters}) {
  return (
    <div className="flex justify-between items-center">
      <p className="font-bold">{title}</p>
      <Button
        variant="link"
        className="text-blue-600 bg-transparent border-none"
        onClick={() => {
            dispatch(updateFilters({projectFilters, [prop]: def}));
        }}
      >
        clear
      </Button>
    </div>
  );
}
