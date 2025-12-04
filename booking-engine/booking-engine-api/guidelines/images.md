# Images

To obtain the URL of an image from `ImageId`, use the following address pattern:

```text
[ImageBaseUrl]/[ImageId]?Width=[Width]&Height=[Height]&Mode=[Mode]
```

For example:

```text
[ImageBaseUrl]/1627aea5-8e0a-4371-9022-9b504344e724?Width=640&Height=480&Mode=1
```

## Image parameters

The `Width` and `Height` parameters are optional. The `Mode` paramater can have one of the following values:

| Value | Name | Description |
| :-- | :-- | :-- |
| `0` | Scale | The image is rescaled to have exactly the specified dimensions. May change image aspect ratio. |
| `1` | Cover | The image is resized to cover the specified dimensions while keeping the aspect ratio. So the result might be larger than the specified size \(only in one dimension\). The result is the smallest possible image that covers the specified size. |
| `3` | CoverExact | The image is resized and clipped to cover the specified dimensions while keeping the aspect ratio. So parts of the image might be missing from the result. |
| `4` | Fit | The image is resized to fit within the specified dimensions while keeping the aspect ratio. So the result might be smaller than the specified size. The result is the largest possible image the fits into the specified size. |
| `5` | FitExact | The image is resized and padded to exactly fit within the specified dimensions while keeping the aspect ratio. So parts of the result image might be blank \(black or transparent, depending on the image format\). |

