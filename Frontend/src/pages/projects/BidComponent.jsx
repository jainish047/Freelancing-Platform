import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BidComponent({ bid }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col justify-start w-full p-3 border rounded shadow hover:bg-gray-200 hover:cursor-pointer">
          <div className="flex justify-between w-full">
            <p className="font-bold text-blue-500">{bid.user.name}</p>
            <div><span className="font-medium">Bid Amount: </span> ₹ {bid.amount}</div>
          </div>
          <div className="flex flex-col items-start w-full">
            <div><span className="font-medium">Milestones: </span>{bid.milestones.length}</div>
            <p className="text-gray-600">{bid.proposal}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{bid.user.name}</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col gap-3">
          <div><span className="font-semibold">Budget: </span>₹ {bid.amount}</div>
          <div className="">
            <h3 className="font-semibold">Proposal</h3>
            <p className="break-words whitespace-normal">{bid.proposal}</p>
          </div>
          <div>
            <h3 className="font-semibold">Milestones:</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Milestone</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bid.milestones.map((milestone) => {
                  return (
                    <TableRow>
                      <TableCell>{milestone.description}</TableCell>
                      <TableCell className="text-right">
                        ${milestone.amount}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
