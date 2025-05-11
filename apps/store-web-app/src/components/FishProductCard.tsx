import { Product } from "@/types/product";
import { Chip, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
//import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";

interface Props {
  product: Product;
}

export const FishProductCard = ({
  product: { id, name, price, description },
}: Props) => {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Link
        href={{ pathname: `/fish/${id}` }}
        passHref
        style={{ textDecoration: "none" }}
      >
        <Card sx={{ height: 240 }}>
          <CardActionArea sx={{ height: "100%" }}>
            {/*

        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        */}

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

//<MuiLink component={Link} href={{ pathname: `/fish/${id}` }}>
//  View
//</MuiLink>
