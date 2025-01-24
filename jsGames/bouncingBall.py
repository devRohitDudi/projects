import pygame
import math

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 600, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Bouncing Ball in Rotating Square")

# Colors
WHITE = (255, 255, 255)
YELLOW = (255, 255, 0)

# Ball properties
ball_radius = 20
ball_pos = [WIDTH // 2, HEIGHT // 2]
ball_vel = [5, 3]

# Square properties
square_size = 300
square_center = [WIDTH // 2, HEIGHT // 2]
rotation_speed = 0.01  # radians per frame
rotation = 0

# Game loop
running = True
clock = pygame.time.Clock()

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Update ball position
    ball_pos[0] += ball_vel[0]
    ball_pos[1] += ball_vel[1]

    # Rotate the square
    rotation += rotation_speed
    if rotation >= 2 * math.pi:  # Reset rotation to keep it within 0 to 2π
        rotation -= 2 * math.pi

    # Collision detection with the square (considering rotation)
    # Convert ball position to local coordinate system of the square
    rel_x = ball_pos[0] - square_center[0]
    rel_y = ball_pos[1] - square_center[1]
    
    # Rotate back using negative rotation
    angle = -rotation
    rot_x = rel_x * math.cos(angle) - rel_y * math.sin(angle)
    rot_y = rel_x * math.sin(angle) + rel_y * math.cos(angle)

    # Check if ball is outside square in rotated space
    if abs(rot_x) > square_size // 2 - ball_radius or abs(rot_y) > square_size // 2 - ball_radius:
        # Reflect velocity based on which edge was hit
        if abs(rot_x) > square_size // 2 - ball_radius:
            ball_vel[0] = -ball_vel[0]
        if abs(rot_y) > square_size // 2 - ball_radius:
            ball_vel[1] = -ball_vel[1]
        
        # Adjust ball position to prevent it from going outside
        rel_x = min(max(rel_x, -(square_size // 2 - ball_radius)), square_size // 2 - ball_radius)
        rel_y = min(max(rel_y, -(square_size // 2 - ball_radius)), square_size // 2 - ball_radius)
        
        # Convert back to screen coordinates
        ball_pos[0] = square_center[0] + rel_x * math.cos(angle) - rel_y * math.sin(angle)
        ball_pos[1] = square_center[1] + rel_x * math.sin(angle) + rel_y * math.cos(angle)

    # Clear the screen
    screen.fill(WHITE)

    # Draw the rotating square
    points = []
    for angle in range(0, 360, 90):
        angle_rad = math.radians(angle) + rotation
        x = square_center[0] + square_size // 2 * math.cos(angle_rad)
        y = square_center[1] + square_size // 2 * math.sin(angle_rad)
        points.append((x, y))
    pygame.draw.polygon(screen, (0, 0, 0), points, 2)

    # Draw the ball
    pygame.draw.circle(screen, YELLOW, (int(ball_pos[0]), int(ball_pos[1])), ball_radius)

    # Update display
    pygame.display.flip()

    # Cap the frame rate
    clock.tick(60)

pygame.quit()