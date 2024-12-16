import { OrdersPage, ReservationsPage, UsersPage, BusinessesPage } from '../Pages/js'; // Adjust import paths as needed

export const roleRoutes = {
  SuperAdmin: [
    { path: "/orders", label: "Orders", component: OrdersPage },
    { path: "/reservations", label: "Reservations", component: ReservationsPage },
    { path: "/users", label: "Users", component: UsersPage },
    { path: "/businesses", label: "Businesses", component: BusinessesPage },
  ],
  BusinessOwner: [
    { path: "/orders", label: "Orders", component: OrdersPage },
    { path: "/reservations", label: "Reservations", component: ReservationsPage },
  ],
  Employee: [
    { path: "/reservations", label: "Reservations", component: ReservationsPage },
  ],
};
