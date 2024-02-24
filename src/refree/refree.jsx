// Import necessary components
import { PieceType, TeamType } from '../components/Chessboard/Chessboard';

// Export the Refree class
export default class Refree {

    // Function to check if a tile is occupied
    tileIsOccupied(x, y, initialBoardState) {
        // Log a message for debugging
        console.log("checking if tile is occupied..");

        // Find a piece at the given coordinates using Array.find
        const piece = initialBoardState.find(p => p.x === x && p.y === y);

        // Return true if a piece is found, false otherwise
        return !!piece;  // Used !! for explicit boolean conversion
    }

    // Function to check if a tile is occupied by an opponent
    tileIsOccupiedByOpponent(x, y, initialBoardState, team) {
        // Find a piece at the given coordinates that belongs to the opponent
        const piece = initialBoardState.find((p) => p.x === x && p.y === y && p.team !== team);

        // Return true if an opponent's piece is found, false otherwise
        return !!piece;
    }

    // Function to validate a chess move
    isValidMove(px, py, x, y, type, team, initialBoardState) {
        // Log information for debugging (commented out for now)
        // console.log("Refree is checking the move...");
        // console.log(`Previous location: ${px} ${py}, new location: ${x} ${y} , piece type: ${type}, team: ${team}`);
        // console.log(type === PieceType.PAWN);

        // Implement movement logic for pawns
        if (type === PieceType.PAWN) {
            // Determine the special starting row and movement direction based on team
            const specialRow = (team === TeamType.OUR) ? 1 : 6;
            const pawnDirection = (team === TeamType.OUR) ? 1 : -1;

            // Handle two-step forward movement from the starting position
            if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
                // Check if both tiles in the path are unoccupied
                if (!this.tileIsOccupied(x, y, initialBoardState) && !this.tileIsOccupied(x, y - pawnDirection, initialBoardState)) {
                    return true;
                }
            }

            // Handle one-step forward movement
            else if (px === x && y - py === pawnDirection) {
                // Check if the target tile is unoccupied
                if (!this.tileIsOccupied(x, y, initialBoardState)) {
                    return true;
                }
            }

            // Handle diagonal captures
            else if (x - px === -1 && y - py === pawnDirection) {
                console.log("Upper/bottom left corner");     // Log a message for debugging

                // Check if the target tile is occupied by an opponent
                if (this.tileIsOccupiedByOpponent(x, y, initialBoardState, team)) {
                    return true;
                }
            } else if (x - px === 1 && y - py === pawnDirection) {
                console.log("Upper/bottom right corner");    // Log a message for debugging

                // Check if the target tile is occupied by an opponent
                if (this.tileIsOccupiedByOpponent(x, y, initialBoardState, team)) {
                    return true;
                }
            }
        }

        // If no valid move conditions are met, return false
        return false;
    }
}
