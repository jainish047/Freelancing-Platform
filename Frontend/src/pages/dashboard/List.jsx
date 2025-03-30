import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, Bookmark, List as ListIcon } from "lucide-react";
import { fetchItems } from "../../API/list";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { getItems, getLists, setSelectedList } from "../../context/listSlice";
import Project from "../../components/Project";

export default function List() {
  const user = useSelector((state) => state.auth.user);
  const { lists, selectedList, items } = useSelector((state) => state.lists);
  const [newListName, setNewListName] = useState("");
  const [type, setType] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    async function _getLists() {
      dispatch(getLists());
    }
    _getLists();
    dispatch(setSelectedList());
  }, [dispatch, user]);

  useEffect(() => {
    async function _getItems() {
      dispatch(getItems());
    }
    _getItems();
  }, [dispatch, selectedList]);

  if (!user) return <div className="w-full h-full flex justify-center items-center">please login first</div>;

  return (
    <>
      <Helmet>
        <title>Lists</title>
      </Helmet>
      <div className="p-4 h-full">
        <div className="grid grid-cols-4 h-full gap-4">
          <div className="col-span-1 border rounded shadow p-4">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold my-1">My Lists</p>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-blue-600 p-0 hover:border-0">
                    + New
                  </button>
                </DialogTrigger>
                <DialogContent className="w-96">
                  <DialogHeader>
                    <DialogTitle>Create New List</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right col-span-2">
                        Name:
                      </label>
                      <input
                        className="border w-28"
                        type="text"
                        id="name"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="type" className="text-right col-span-2">
                        Entity Type:
                      </label>
                      <select
                        id="type"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                        className="bg-white border p-1 w-28"
                      >
                        <option value="freelancer">Freelancer</option>
                        <option value="project">Project</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <button
                        className="p-2 bg-blue-600 text-white rounded"
                        onClick={() => {
                          console.log(newListName, type);
                          const responce = createNewList(newListName, type);
                          console.log(responce);
                          if (responce.ok) {
                            setNewListName("");
                            setType("");
                          } else {
                            console.error("error in creating new list");
                          }
                        }}
                      >
                        Create
                      </button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className="my-2">
              <p className="text-lg font-bold">Projects</p>
              <div className="flex flex-col justify-start items-start gap-1 p-2">
                <button
                  className="hover:border-0 border rounded w-full p-0 text-left font-normal flex items-center"
                  onClick={() =>
                    dispatch(
                      setSelectedList({ id: "bookmark", name: "bookmark" })
                    )
                  }
                >
                  <Bookmark size={20} />
                  <span className="ml-2">Bookmark</span>
                </button>
                {lists
                  .filter((list) => list.type == "USER")
                  .map((list) => {
                    <button
                      className="hover:border-0 border rounded w-full p-0 text-left font-normal flex items-center"
                      onClick={() => dispatch(setSelectedList(list))}
                    >
                      <ListIcon size={20} />
                      <span className="ml-2">{list.name}</span>
                    </button>;
                  })}
              </div>
            </div>
            <div className="my-2">
              <p className="text-lg font-bold">Freelancers</p>
              <div className="flex flex-col justify-start items-start gap-1 p-2">
                <button
                  className="hover:border-0 border rounded w-full p-0 text-left font-normal flex items-center"
                  onClick={() =>
                    dispatch(setSelectedList({ id: "like", name: "like" }))
                  }
                >
                  <Heart size={20} />
                  <span className="ml-2">Like</span>
                </button>
                {lists
                  .filter((list) => list.type == "PROJECT")
                  .map((list) => {
                    <button
                      className="hover:border-0 border rounded w-full p-0 text-left font-normal flex items-center"
                      onClick={() => dispatch(setSelectedList(list))}
                    >
                      <List size={20} />
                      <span className="ml-2">{list.name}</span>
                    </button>;
                  })}
              </div>
            </div>
          </div>
          <div className="col-span-3 border rounded shadow p-4">
            {selectedList.type == "PROJECT"
              ? items.map((item) => {
                  return <Project project={item} />;
                })
              : items.map((item) => {
                  return <UserCard user={item} />;
                })}
          </div>
        </div>
      </div>
    </>
  );
}
