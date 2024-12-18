import { SelectBusinessPage, OrdersPage, ReservationsPage, UsersPage, BusinessesPage, ServicesPage, TaxesPage, GiftCardsPage, DiscountsPage, PaymentsPage, RefundsPage, ProductsPage } from '../Pages/js';

export const roleRoutes = {
  SuperAdmin: [
    { path: "/orders", label: "Orders", component: OrdersPage },
    { path: "/reservations", label: "Reservations", component: ReservationsPage },
    { path: "/users", label: "Users", component: UsersPage },
    { path: "/businesses", label: "Businesses", component: BusinessesPage },
    { path: "/services", label: "Services", component: ServicesPage },
    { path: "/taxes", label: "Taxes", component: TaxesPage },
    { path: "/gift-cards", label: "Gift cards", component: GiftCardsPage },
    { path: "/discounts", label: "Discounts", component: DiscountsPage },
    { path: "/payments", label: "Payments", component: PaymentsPage },
    { path: "/refunds", label: "Refunds", component: RefundsPage },
    { path: "/products", label: "Products", component: ProductsPage },
    { path: "/orders", label: "Orders", component: OrdersPage },
    { path: "/selectBusiness", label: "Select Business", component: SelectBusinessPage },
  ],
  BusinessOwner: [
    { path: "/orders", label: "Orders", component: OrdersPage },
    { path: "/reservations", label: "Reservations", component: ReservationsPage },
    { path: "/users", label: "Users", component: UsersPage },
    { path: "/services", label: "Services", component: ServicesPage },
    { path: "/taxes", label: "Taxes", component: TaxesPage },
    { path: "/gift-cards", label: "Gift cards", component: GiftCardsPage },
    { path: "/discounts", label: "Discounts", component: DiscountsPage },
    { path: "/payments", label: "Payments", component: PaymentsPage },
    { path: "/refunds", label: "Refunds", component: RefundsPage },
    { path: "/products", label: "Products", component: ProductsPage },
    { path: "/orders", label: "Orders", component: OrdersPage },
  ],
  Employee: [
    { path: "/orders", label: "Orders", component: OrdersPage },
    { path: "/reservations", label: "Reservations", component: ReservationsPage },
    { path: "/services", label: "Services", component: ServicesPage },
    { path: "/taxes", label: "Taxes", component: TaxesPage },
    { path: "/gift-cards", label: "Gift cards", component: GiftCardsPage },
    { path: "/discounts", label: "Discounts", component: DiscountsPage },
    { path: "/payments", label: "Payments", component: PaymentsPage },
    { path: "/refunds", label: "Refunds", component: RefundsPage },
    { path: "/products", label: "Products", component: ProductsPage },
    { path: "/orders", label: "Orders", component: OrdersPage },
  ],
};
