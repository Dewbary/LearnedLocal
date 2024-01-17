import * as React from "react";
import { Card, Metric, Text, Title, BarList, Flex, Grid } from "@tremor/react";
import Chart from "./Chart";
import { api } from "~/utils/api";

const website = [
  { name: "/home", value: 1230 },
  { name: "/contact", value: 751 },
  { name: "/gallery", value: 471 },
  { name: "/august-discount-offer", value: 280 },
  { name: "/case-studies", value: 78 },
];

const shop = [
  { name: "/home", value: 453 },
  { name: "/imprint", value: 351 },
  { name: "/shop", value: 271 },
  { name: "/pricing", value: 191 },
];

const app = [
  { name: "/shop", value: 789 },
  { name: "/product-features", value: 676 },
  { name: "/about", value: 564 },
  { name: "/login", value: 234 },
  { name: "/downloads", value: 191 },
];

const KpiDashboard = () => {
  const activeUsers = api.user.getActiveUsers.useQuery();
  const totalRevenue = api.payment.getTotalRevenue.useQuery();
  const signups = api.user.newSignups.useQuery();
  const textlist = api.textlist.getTextList.useQuery();
  const textlistInteractions = api.textlist.getTextListInteractions.useQuery();

  const data = [
    {
      category: "Active Users",
      subText: "Past Week",
      stat: activeUsers.data?.length,
      data: null,
    },
    {
      category: "Revenue",
      subText: "All Time",
      stat: totalRevenue.data,
      data: shop,
    },
    {
      category: "New Accounts",
      subText: "Past Week",
      stat: signups.data?.length,
      data: app,
    },
    {
      category: "SMS List Size",
      subText: "Total",
      stat: textlist.data?.length,
      data: null,
    },
    {
      category: "SMS Interactions",
      subText: "Past Week",
      stat: textlistInteractions.data,
      data: null,
    },
  ];

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Metric>{item.stat}</Metric>
              <Text>{item.subText}</Text>
            </Flex>
            {item.data && (
              <>
                <Flex className="mt-6">
                  <Text>Pages</Text>
                  <Text className="text-right">Views</Text>
                </Flex>

                <BarList
                  data={item.data}
                  valueFormatter={(number: number) =>
                    Intl.NumberFormat("us").format(number).toString()
                  }
                  className="mt-2"
                />
              </>
            )}
          </Card>
        ))}
      </Grid>
      <Chart />
    </main>
  );
};

export default KpiDashboard;
