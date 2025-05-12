import { Product } from "@/types/product";
import { Chip, Grid, Typography } from "@mui/material";
import { memo } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Link from "next/link";

interface Props {
  product: Product;
}

const FishProductCardComponent = ({ product: { id, name, price, description } }: Props) => {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Link
        href={{ pathname: `/fish/${id}` }}
        passHref
        style={{ textDecoration: "none" }}
      >
        <Card sx={{ height: 240 }}>
          <CardActionArea sx={{ height: "100%" }}>
            <CardContent>
              <Chip
                color="primary"
                label={`$${price}`}
                sx={{ color: "white", fontWeight: "bold" }}
              />

              <Typography my={1} fontWeight="bold">
                {name}
              </Typography>

              <Typography variant="body2">{description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
};

export const FishProductCard = memo(FishProductCardComponent);
FishProductCard.displayName = 'FishProductCard';
