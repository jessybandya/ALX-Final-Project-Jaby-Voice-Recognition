import { Card, Typography } from "@material-tailwind/react";
 
const TABLE_HEAD = ["Words", "Function"];
 
const TABLE_ROWS = [
  {
    name: "Home",
    job: "Go To Home Page"
  },
  {
    name: "Back",
    job: "Going back to previous page"
  },
  {
    name: "learn",
    job: "Open Learn Modal"
  },
  {
    name: "Shop",
    job: "Go to Repos Shop Page"
  },
  {
    name: "Open",
    job: "Open Cart"
  },
  {
    name: "Close",
    job: "Close Cart & Learn Modal"
  },
  {
    name: "Log Out",
    job: "Sign Out"
  },
  {
    name: "login",
    job: "Login Page"
  },
  {
    name: "Register",
    job: "Register Page"
  },
  {
    name: "Scroll Down",
    job: "Scroll Down Page"
  },
  {
    name: "Scroll Up",
    job: "Scroll Up Page"
  },
  {
    name: "View (..product name...)",
    job: "Open the named product page"
  },
  {
    name: "Add",
    job: "Add to cart the named product in its page"
  },
  {
    name: "Checkout",
    job: "Go to checkout page"
  },
];
 
export function LearnTable() {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name, job, date }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography variant="small" color="blue" className="font-normal">
                    <b>{name}</b>
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {job}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}